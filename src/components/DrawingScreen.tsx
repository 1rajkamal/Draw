import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Pencil,
  PenTool,
  Paintbrush,
  Highlighter,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Sparkles,
  Maximize2,
  Palette,
  Send,
  AlertCircle
} from 'lucide-react';
import { ReferenceDrawing, REFERENCE_IMAGES } from '../data/referenceImages';
import { RoomData, Player } from '../services/socketService';
import { calculateDrawingScore, ScoreResult } from '../utils/scoringEngine';
import { sounds } from '../utils/soundEffects';

interface DrawingScreenProps {
  room: RoomData;
  myPlayerId: string;
  selectedImageId: string;
  isSolo?: boolean;
  onSubmit: (drawingDataUrl: string, strokes: any[], score: number, breakdown: ScoreResult) => void;
  onSendReaction: (emoji: string) => void;
}

type ToolType = 'pencil' | 'pen' | 'brush' | 'highlighter' | 'eraser';

interface StrokePoint {
  x: number;
  y: number;
  pressure?: number;
}

interface Stroke {
  tool: ToolType;
  color: string;
  size: number;
  opacity: number;
  points: StrokePoint[];
}

const PRESET_COLORS = [
  '#000000',
  '#ffffff',
  '#ef4444',
  '#f97316',
  '#facc15',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#78350f',
  '#64748b',
];

export const DrawingScreen: React.FC<DrawingScreenProps> = ({
  room,
  myPlayerId,
  selectedImageId,
  isSolo = false,
  onSubmit,
  onSendReaction,
}) => {
  const reference: ReferenceDrawing =
    REFERENCE_IMAGES.find((img) => img.id === selectedImageId) || REFERENCE_IMAGES[0];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const strokeHistoryRef = useRef<Stroke[]>([]);
  const redoStackRef = useRef<Stroke[]>([]);

  // Tool State
  const [currentTool, setCurrentTool] = useState<ToolType>('brush');
  const [currentColor, setCurrentColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(8);
  const [opacity, setOpacity] = useState<number>(1.0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UI state
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showRefOnMobile, setShowRefOnMobile] = useState(true);
  const [refExpanded, setRefExpanded] = useState(false);
  const [customColor, setCustomColor] = useState('#000000');

  // Timer State
  const [timeLeft, setTimeLeft] = useState<number>(room.timerDuration || 120);

  // Identify players
  const myPlayer = room.players.find((p) => p.playerId === myPlayerId) || room.players[0];
  const partnerPlayer = room.players.find((p) => p.playerId !== myPlayerId);

  // Redraw full canvas from strokes
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset with crisp white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Replay all strokes
    strokeHistoryRef.current.forEach((stroke) => {
      if (stroke.points.length === 0) return;

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.tool === 'eraser') {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = stroke.size;
        ctx.globalAlpha = 1.0;
      } else if (stroke.tool === 'highlighter') {
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size * 2;
        ctx.globalAlpha = stroke.opacity * 0.35;
      } else if (stroke.tool === 'pen') {
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;
        ctx.globalAlpha = stroke.opacity * 0.85;
      } else if (stroke.tool === 'pencil') {
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = Math.max(2, stroke.size * 0.4);
        ctx.globalAlpha = 1.0;
      } else {
        // Brush
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;
        ctx.globalAlpha = stroke.opacity;
      }

      const pts = stroke.points;
      if (pts.length === 1) {
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);

        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }

        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
        ctx.stroke();
      }

      ctx.restore();
    });

    setCanUndo(strokeHistoryRef.current.length > 0);
    setCanRedo(redoStackRef.current.length > 0);
  }, []);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Standard high-res resolution (800x800 internal, responsive CSS display)
    canvas.width = 800;
    canvas.height = 800;

    redrawCanvas();
  }, [redrawCanvas]);

  // Submit Handler
  const handleFinalSubmit = useCallback(async () => {
    if (isSubmitted || isSubmitting) return;
    setIsSubmitting(true);
    setIsSubmitted(true);
    sounds.playSubmit();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');

    // Calculate score using algorithmic computer vision engine
    const scoreResult = await calculateDrawingScore(
      reference.svg,
      dataUrl,
      room.level
    );

    onSubmit(dataUrl, strokeHistoryRef.current, scoreResult.total, scoreResult);
  }, [isSubmitted, isSubmitting, reference.svg, room.level, onSubmit]);

  // Synchronized Countdown Timer
  useEffect(() => {
    if (room.timerDuration === 0 || isSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinalSubmit();
          return 0;
        }
        if (prev <= 11) {
          sounds.playUrgentTick();
        } else if (prev % 10 === 0 && prev <= 30) {
          sounds.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [room.timerDuration, isSubmitted, handleFinalSubmit]);

  // Pointer Coordinate Normalizer
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // Pointer Event Listeners
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isSubmitted) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    isDrawingRef.current = true;
    redoStackRef.current = []; // Reset redo stack on new action
    sounds.playStroke();

    const coords = getCanvasCoords(e);
    const newStroke: Stroke = {
      tool: currentTool,
      color: currentColor,
      size: brushSize,
      opacity: opacity,
      points: [coords],
    };

    currentStrokeRef.current = newStroke;
    strokeHistoryRef.current.push(newStroke);
    redrawCanvas();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !currentStrokeRef.current || isSubmitted) return;

    const coords = getCanvasCoords(e);
    currentStrokeRef.current.points.push(coords);
    redrawCanvas();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isSubmitted) return;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }
    isDrawingRef.current = false;
    currentStrokeRef.current = null;
    redrawCanvas();
  };

  // Undo / Redo Actions
  const handleUndo = () => {
    if (strokeHistoryRef.current.length === 0 || isSubmitted) return;
    sounds.playClick();
    const popped = strokeHistoryRef.current.pop();
    if (popped) {
      redoStackRef.current.push(popped);
      redrawCanvas();
    }
  };

  const handleRedo = () => {
    if (redoStackRef.current.length === 0 || isSubmitted) return;
    sounds.playClick();
    const popped = redoStackRef.current.pop();
    if (popped) {
      strokeHistoryRef.current.push(popped);
      redrawCanvas();
    }
  };

  const handleClear = () => {
    sounds.playClick();
    strokeHistoryRef.current = [];
    redoStackRef.current = [];
    redrawCanvas();
    setShowClearConfirm(false);
  };

  // Keyboard Shortcuts (Ctrl+Z, Ctrl+Y, E, B, P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitted) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (e.key.toLowerCase() === 'e') {
        setCurrentTool('eraser');
      } else if (e.key.toLowerCase() === 'b') {
        setCurrentTool('brush');
      } else if (e.key.toLowerCase() === 'p') {
        setCurrentTool('pencil');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full flex-1 flex flex-col max-w-7xl mx-auto p-2 sm:p-4 md:p-6 select-none relative">
      {/* Top Banner: Partner Live Status & Timer Bar */}
      <div className="glass-panel px-3 sm:px-4 py-2.5 mb-3 sm:mb-4 flex items-center justify-between gap-2">
        {/* Partner Live Status Indicator */}
        <div className="flex items-center gap-2 overflow-hidden">
          {isSolo ? (
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="text-base">🎨</span>
              <span className="font-semibold hidden xs:inline">Solo Practice Mode</span>
            </div>
          ) : partnerPlayer ? (
            <div className="flex items-center gap-2">
              <span className="text-xl shrink-0">{partnerPlayer.avatar}</span>
              <div className="text-left truncate">
                <span className="text-xs font-bold text-white block truncate">
                  {partnerPlayer.name}
                </span>
                <span className="text-[11px] flex items-center gap-1 font-medium">
                  {partnerPlayer.submitted ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      Submitted! Waiting for you...
                    </span>
                  ) : (
                    <span className="text-purple-300 animate-pulse flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                      Drawing right now... ✏️
                    </span>
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400">Waiting for partner...</div>
          )}
        </div>

        {/* Center Countdown Timer */}
        {room.timerDuration > 0 && (
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-sm sm:text-base font-bold border transition-colors ${
              timeLeft <= 10
                ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-bounce'
                : timeLeft <= 30
                ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                : 'bg-slate-800 text-white border-white/10'
            }`}
          >
            <Clock size={15} />
            <span>{formatTimer(timeLeft)}</span>
          </div>
        )}

        {/* Live Reaction Emojis & Submit Action */}
        <div className="flex items-center gap-2">
          {/* Reaction Bar */}
          {!isSolo && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-white/10">
              {['💖', '🔥', '🎉', '😂'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onSendReaction(emoji);
                    sounds.playPop();
                  }}
                  className="w-7 h-7 rounded-lg hover:bg-slate-700 flex items-center justify-center text-sm hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleFinalSubmit}
            disabled={isSubmitted || isSubmitting}
            className={`btn-primary py-2 px-3 sm:px-5 text-xs sm:text-sm font-bold shadow-lg ${
              isSubmitted ? 'opacity-60 bg-emerald-600' : ''
            }`}
          >
            {isSubmitted ? (
              <span className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 size={16} />
                Submitted!
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Send size={14} />
                Submit Drawing
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace (Dual Columns on Desktop / Split on Mobile) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start relative">
        {/* Left Col: Reference Card (Desktop / Tablet) lg:col-span-4 */}
        <div
          className={`lg:col-span-4 ${
            showRefOnMobile ? 'block' : 'hidden lg:block'
          } glass-panel p-4 space-y-3 sticky top-16 z-20`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase font-bold text-pink-400">
                {reference.category} • {reference.difficulty.toUpperCase()}
              </span>
              <h3 className="text-base font-extrabold text-white">{reference.title}</h3>
            </div>
            <button
              onClick={() => setShowRefOnMobile(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
              title="Hide reference"
            >
              <EyeOff size={16} />
            </button>
          </div>

          {/* Big Reference Art Display */}
          <div
            className="w-full aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-2 shadow-inner flex items-center justify-center cursor-pointer hover:scale-[1.01] transition-transform"
            onClick={() => setRefExpanded(true)}
            title="Click to zoom reference"
            dangerouslySetInnerHTML={{ __html: reference.svg }}
          />

          {/* Hint & Color Palette Suggestions */}
          <div className="space-y-2 text-xs">
            <p className="text-slate-300 leading-tight">
              💡 <span className="font-semibold text-cyan-300">Hint:</span> {reference.hint}
            </p>

            <div className="pt-2 border-t border-white/5">
              <span className="text-[11px] text-slate-400 font-medium block mb-1.5">
                Artwork Palette:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {reference.palette.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentColor(c);
                      if (currentTool === 'eraser') setCurrentTool('brush');
                      sounds.playClick();
                    }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      currentColor === c ? 'border-white scale-125' : 'border-black/30 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Mini-Reference Floating Toggle Button */}
        {!showRefOnMobile && (
          <button
            onClick={() => setShowRefOnMobile(true)}
            className="lg:hidden fixed bottom-24 right-4 z-30 p-3 rounded-full bg-pink-500 text-white shadow-2xl flex items-center gap-1.5 text-xs font-bold animate-bounce"
          >
            <Eye size={16} />
            Reference
          </button>
        )}

        {/* Right Col: Drawing Canvas & Floating Toolbar (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center space-y-3">
          {/* Canvas Wrapper */}
          <div className="w-full relative flex items-center justify-center p-2 rounded-2xl bg-slate-950/60 border border-white/10 shadow-2xl">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="drawing-canvas w-full max-w-[720px] aspect-square"
            />

            {/* Submission Lock Overlay */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 text-3xl">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Canvas Locked & Submitted!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
                  {partnerPlayer?.submitted
                    ? 'Both submitted! Computing AI accuracy scores...'
                    : `Waiting for ${partnerPlayer?.name || 'partner'} to finish drawing...`}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                  <span className="text-xs text-pink-300 font-semibold">Results revealing soon...</span>
                </div>
              </div>
            )}
          </div>

          {/* Full Floating Drawing Toolbar */}
          <div className="w-full max-w-[720px] glass-panel p-3 sm:p-4 space-y-3">
            {/* Top Toolbar Row: Tools & History */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
              {/* Tool Buttons */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTool('pencil');
                    sounds.playClick();
                  }}
                  className={`tool-btn ${currentTool === 'pencil' ? 'active' : ''}`}
                  title="Pencil (Crisp & fine line)"
                >
                  <Pencil size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentTool('pen');
                    sounds.playClick();
                  }}
                  className={`tool-btn ${currentTool === 'pen' ? 'active' : ''}`}
                  title="Sketch Pen (Medium ink stroke)"
                >
                  <PenTool size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentTool('brush');
                    sounds.playClick();
                  }}
                  className={`tool-btn ${currentTool === 'brush' ? 'active' : ''}`}
                  title="Artist Brush (Smooth soft edge)"
                >
                  <Paintbrush size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentTool('highlighter');
                    sounds.playClick();
                  }}
                  className={`tool-btn ${currentTool === 'highlighter' ? 'active' : ''}`}
                  title="Highlighter / Marker (Translucent broad stroke)"
                >
                  <Highlighter size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentTool('eraser');
                    sounds.playClick();
                  }}
                  className={`tool-btn ${currentTool === 'eraser' ? 'active' : ''}`}
                  title="Precision Eraser"
                >
                  <Eraser size={18} />
                </button>
              </div>

              {/* Undo / Redo / Clear */}
              <div className="flex items-center gap-1 sm:gap-2 pl-2 border-l border-white/10">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={!canUndo || isSubmitted}
                  className="tool-btn disabled:opacity-30"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleRedo}
                  disabled={!canRedo || isSubmitted}
                  className="tool-btn disabled:opacity-30"
                  title="Redo (Ctrl+Y)"
                >
                  <Redo2 size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  disabled={isSubmitted}
                  className="tool-btn text-rose-400 hover:text-rose-300 disabled:opacity-30"
                  title="Clear Canvas"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Bottom Toolbar Row: Size Slider & Color Swatches */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-2 border-t border-white/10">
              {/* Brush Size Slider (sm:col-span-4) */}
              <div className="sm:col-span-4 flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">
                  Size: {brushSize}px
                </span>
                <input
                  type="range"
                  min={2}
                  max={48}
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="flex-1"
                />
                <div
                  className="w-5 h-5 rounded-full bg-pink-500 shrink-0 border border-white/40"
                  style={{ transform: `scale(${Math.max(0.4, brushSize / 48)})` }}
                />
              </div>

              {/* Color Palette (sm:col-span-8) */}
              <div className="sm:col-span-8 flex items-center gap-1.5 flex-wrap justify-start sm:justify-end">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCurrentColor(c);
                      if (currentTool === 'eraser') setCurrentTool('brush');
                      sounds.playClick();
                    }}
                    className={`color-swatch ${
                      currentColor === c && currentTool !== 'eraser' ? 'active' : ''
                    }`}
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}

                {/* Custom Color Wheel Picker */}
                <label
                  className="w-8 h-8 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center cursor-pointer hover:border-white transition-colors relative overflow-hidden"
                  title="Custom Color Picker"
                >
                  <Palette size={14} className="text-white" />
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      setCurrentColor(e.target.value);
                      if (currentTool === 'eraser') setCurrentTool('brush');
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Reference Zoom Modal */}
      {refExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setRefExpanded(false)}
        >
          <div
            className="glass-panel w-full max-w-lg p-6 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setRefExpanded(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-white mb-3">{reference.title}</h3>
            <div
              className="w-full aspect-square rounded-2xl bg-slate-900 border border-white/10 p-4 mb-4"
              dangerouslySetInnerHTML={{ __html: reference.svg }}
            />
            <p className="text-xs text-slate-300">{reference.hint}</p>
          </div>
        </div>
      )}

      {/* Clear Canvas Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-xs p-5 text-center">
            <AlertCircle size={36} className="text-rose-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">Clear Canvas?</h3>
            <p className="text-xs text-slate-300 mt-1 mb-4">
              This will erase all your current strokes. You cannot undo this!
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="btn-secondary flex-1 py-2 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleClear}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Yes, Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
