import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Play, RotateCcw, Download, Sparkles, Award, Users, Share2, Check, ArrowRight } from 'lucide-react';
import { ReferenceDrawing, REFERENCE_IMAGES } from '../data/referenceImages';
import { RoomData, Player } from '../services/socketService';
import { generateMatchCard } from '../utils/cardGenerator';
import { sounds } from '../utils/soundEffects';

interface ResultScreenProps {
  room: RoomData;
  myPlayerId: string;
  selectedImageId: string;
  isSolo?: boolean;
  onPlayAgain: (action: 'same_level' | 'new_level' | 'lobby') => void;
  onLeaveRoom: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  room,
  myPlayerId,
  selectedImageId,
  isSolo = false,
  onPlayAgain,
  onLeaveRoom,
}) => {
  const reference: ReferenceDrawing =
    REFERENCE_IMAGES.find((img) => img.id === selectedImageId) || REFERENCE_IMAGES[0];

  const player1 = room.players.find((p) => p.isHost) || room.players[0];
  const player2 = room.players.find((p) => !p.isHost) || (room.players.length > 1 ? room.players[1] : null);

  const [downloadingCard, setDownloadingCard] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Time-lapse Replay Player State
  const [isReplaying, setIsReplaying] = useState(false);
  const [replaySpeed, setReplaySpeed] = useState<number>(2);
  const replayCanvasP1Ref = useRef<HTMLCanvasElement | null>(null);
  const replayCanvasP2Ref = useRef<HTMLCanvasElement | null>(null);
  const replayIntervalRef = useRef<any>(null);

  const winner = room.isTie
    ? null
    : room.players.find((p) => p.playerId === room.winnerPlayerId) ||
      (player2 && (player1.score ?? 0) > (player2.score ?? 0) ? player1 : player2) ||
      player1;

  // Trigger Victory Confetti & Audio Fanfare
  useEffect(() => {
    sounds.playWinFanfare();

    // Multistage Confetti Cannons
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  // Download Composite Postcard
  const handleDownloadCard = async () => {
    setDownloadingCard(true);
    sounds.playClick();
    try {
      const cardUrl = await generateMatchCard(
        reference,
        {
          name: player1.name,
          avatar: player1.avatar,
          score: player1.score,
          drawingDataUrl: player1.drawingDataUrl,
          isWinner: winner?.playerId === player1.playerId && !room.isTie,
        },
        player2
          ? {
              name: player2.name,
              avatar: player2.avatar,
              score: player2.score,
              drawingDataUrl: player2.drawingDataUrl,
              isWinner: winner?.playerId === player2.playerId && !room.isTie,
            }
          : null,
        room.isTie
      );

      const link = document.createElement('a');
      link.download = `DrawingDuel_${room.code || 'match'}_${Date.now()}.png`;
      link.href = cardUrl;
      link.click();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to generate match card', err);
    } finally {
      setDownloadingCard(false);
    }
  };

  // Synchronized Time-Lapse Replay Engine
  const startReplay = () => {
    setIsReplaying(true);
    sounds.playClick();

    const canvas1 = replayCanvasP1Ref.current;
    const canvas2 = replayCanvasP2Ref.current;
    if (!canvas1) return;

    canvas1.width = 400;
    canvas1.height = 400;
    const ctx1 = canvas1.getContext('2d')!;
    ctx1.fillStyle = '#ffffff';
    ctx1.fillRect(0, 0, 400, 400);

    let ctx2: CanvasRenderingContext2D | null = null;
    if (canvas2) {
      canvas2.width = 400;
      canvas2.height = 400;
      ctx2 = canvas2.getContext('2d')!;
      ctx2.fillStyle = '#ffffff';
      ctx2.fillRect(0, 0, 400, 400);
    }

    const strokes1 = player1.strokes || [];
    const strokes2 = player2?.strokes || [];
    const maxStrokes = Math.max(strokes1.length, strokes2.length, 1);

    let currentIdx = 0;
    if (replayIntervalRef.current) clearInterval(replayIntervalRef.current);

    replayIntervalRef.current = setInterval(() => {
      if (currentIdx >= maxStrokes) {
        clearInterval(replayIntervalRef.current);
        return;
      }

      // Draw stroke on Canvas 1
      if (currentIdx < strokes1.length) {
        renderSingleStroke(ctx1, strokes1[currentIdx], 400 / 800);
      }

      // Draw stroke on Canvas 2
      if (ctx2 && currentIdx < strokes2.length) {
        renderSingleStroke(ctx2, strokes2[currentIdx], 400 / 800);
      }

      currentIdx++;
    }, 150 / replaySpeed);
  };

  const renderSingleStroke = (ctx: CanvasRenderingContext2D, stroke: any, scale: number) => {
    if (!stroke || !stroke.points || stroke.points.length === 0) return;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (stroke.tool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = stroke.size * scale;
      ctx.globalAlpha = 1.0;
    } else if (stroke.tool === 'highlighter') {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size * 2 * scale;
      ctx.globalAlpha = (stroke.opacity || 1) * 0.35;
    } else {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size * scale;
      ctx.globalAlpha = stroke.opacity || 1.0;
    }

    const pts = stroke.points;
    if (pts.length === 1) {
      ctx.beginPath();
      ctx.arc(pts[0].x * scale, pts[0].y * scale, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(pts[0].x * scale, pts[0].y * scale);
      for (let i = 1; i < pts.length - 1; i++) {
        const xc = (pts[i].x * scale + pts[i + 1].x * scale) / 2;
        const yc = (pts[i].y * scale + pts[i + 1].y * scale) / 2;
        ctx.quadraticCurveTo(pts[i].x * scale, pts[i].y * scale, xc, yc);
      }
      ctx.lineTo(pts[pts.length - 1].x * scale, pts[pts.length - 1].y * scale);
      ctx.stroke();
    }
    ctx.restore();
  };

  return (
    <div className="w-full flex-1 max-w-6xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
      {/* Victory Crown Banner */}
      <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold mb-3 shadow-lg shadow-amber-500/20">
          <Trophy size={18} className="text-amber-400 fill-amber-400" />
          <span>Match Evaluation Complete</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {room.isTie ? (
            <span className="gradient-text-gold">It's a Perfect Tie! 🤝</span>
          ) : (
            <>
              <span className="gradient-text-pink">{winner?.name}</span> Wins This Round! 👑
            </>
          )}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
          Scored by our multi-metric computer vision engine based on outline accuracy, color fidelity, and structural similarity.
        </p>
      </div>

      {/* 3-Way Comparison Showcase Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch mb-8">
        {/* Card 1: Original Reference */}
        <div className="glass-panel p-4 sm:p-5 flex flex-col justify-between rounded-2xl relative overflow-hidden border border-cyan-500/30">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                🎯 Target Reference
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                100% BENCHMARK
              </span>
            </div>
            <h3 className="text-base font-bold text-white truncate">{reference.title}</h3>
          </div>

          <div
            className="w-full aspect-square rounded-xl overflow-hidden bg-slate-900 border border-white/10 p-2 my-3 flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: reference.svg }}
          />

          <div className="text-xs text-slate-400 text-center">
            {reference.category} • {reference.difficulty.toUpperCase()} Prompt
          </div>
        </div>

        {/* Card 2: Player 1 Drawing */}
        <div
          className={`glass-panel p-4 sm:p-5 flex flex-col justify-between rounded-2xl relative overflow-hidden transition-all ${
            winner?.playerId === player1.playerId && !room.isTie
              ? 'border-2 border-amber-400 shadow-2xl shadow-amber-500/20 bg-slate-800/90'
              : 'border border-pink-500/30'
          }`}
        >
          {winner?.playerId === player1.playerId && !room.isTie && (
            <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold flex items-center gap-1 shadow-md">
              👑 WINNER
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{player1.avatar}</span>
              <h3 className="text-base font-bold text-white truncate">{player1.name}</h3>
            </div>
            <span className="text-xs font-mono font-bold text-pink-400">
              {player1.isHost ? 'Host Artist' : 'Guest Artist'}
            </span>
          </div>

          {/* Canvas Image */}
          <div className="w-full aspect-square rounded-xl overflow-hidden bg-white border border-white/20 my-3 shadow-inner">
            {player1.drawingDataUrl ? (
              <img
                src={player1.drawingDataUrl}
                alt={`${player1.name}'s drawing`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                No drawing submitted
              </div>
            )}
          </div>

          {/* Scores Breakdown */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <span className="text-xs font-bold text-slate-300">Total Match:</span>
              <span className="text-lg font-black text-pink-400 font-mono">
                {player1.score ?? 0}%
              </span>
            </div>

            {player1.breakdown && (
              <div className="grid grid-cols-3 gap-1 text-center text-[10px]">
                <div className="p-1 rounded bg-slate-800/80">
                  <span className="text-slate-400 block">Shape</span>
                  <span className="font-bold text-white">{player1.breakdown.shape}%</span>
                </div>
                <div className="p-1 rounded bg-slate-800/80">
                  <span className="text-slate-400 block">Color</span>
                  <span className="font-bold text-white">{player1.breakdown.color}%</span>
                </div>
                <div className="p-1 rounded bg-slate-800/80">
                  <span className="text-slate-400 block">Detail</span>
                  <span className="font-bold text-white">{player1.breakdown.detail}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Player 2 Drawing (if dual mode) or Practice Stats */}
        {player2 ? (
          <div
            className={`glass-panel p-4 sm:p-5 flex flex-col justify-between rounded-2xl relative overflow-hidden transition-all ${
              winner?.playerId === player2.playerId && !room.isTie
                ? 'border-2 border-amber-400 shadow-2xl shadow-amber-500/20 bg-slate-800/90'
                : 'border border-purple-500/30'
            }`}
          >
            {winner?.playerId === player2.playerId && !room.isTie && (
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold flex items-center gap-1 shadow-md">
                👑 WINNER
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{player2.avatar}</span>
                <h3 className="text-base font-bold text-white truncate">{player2.name}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-purple-400">
                Challenger
              </span>
            </div>

            {/* Canvas Image */}
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-white border border-white/20 my-3 shadow-inner">
              {player2.drawingDataUrl ? (
                <img
                  src={player2.drawingDataUrl}
                  alt={`${player2.name}'s drawing`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                  No drawing submitted
                </div>
              )}
            </div>

            {/* Scores Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-white/10">
                <span className="text-xs font-bold text-slate-300">Total Match:</span>
                <span className="text-lg font-black text-purple-400 font-mono">
                  {player2.score ?? 0}%
                </span>
              </div>

              {player2.breakdown && (
                <div className="grid grid-cols-3 gap-1 text-center text-[10px]">
                  <div className="p-1 rounded bg-slate-800/80">
                    <span className="text-slate-400 block">Shape</span>
                    <span className="font-bold text-white">{player2.breakdown.shape}%</span>
                  </div>
                  <div className="p-1 rounded bg-slate-800/80">
                    <span className="text-slate-400 block">Color</span>
                    <span className="font-bold text-white">{player2.breakdown.color}%</span>
                  </div>
                  <div className="p-1 rounded bg-slate-800/80">
                    <span className="text-slate-400 block">Detail</span>
                    <span className="font-bold text-white">{player2.breakdown.detail}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="glass-panel p-5 flex flex-col justify-center text-center items-center rounded-2xl border border-white/10">
            <span className="text-4xl mb-2">⭐</span>
            <h3 className="font-bold text-white">Solo Practice Match</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xs">
              Great practice round! Invite a partner to play head-to-head in real time.
            </p>
          </div>
        )}
      </div>

      {/* Stroke Time-Lapse Replay Modal / Section */}
      {isReplaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-3xl p-6 text-center relative max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsReplaying(false);
                if (replayIntervalRef.current) clearInterval(replayIntervalRef.current);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <span>⏱️</span> Synchronized Time-Lapse Replay
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Watch how both artworks were created stroke-by-stroke!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-xs font-bold text-pink-400 block mb-1">
                  {player1.avatar} {player1.name}
                </span>
                <canvas
                  ref={replayCanvasP1Ref}
                  className="w-full aspect-square bg-white rounded-xl shadow-lg"
                />
              </div>

              {player2 && (
                <div>
                  <span className="text-xs font-bold text-purple-400 block mb-1">
                    {player2.avatar} {player2.name}
                  </span>
                  <canvas
                    ref={replayCanvasP2Ref}
                    className="w-full aspect-square bg-white rounded-xl shadow-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={startReplay}
                className="btn-primary py-2 px-4 text-xs font-bold flex items-center gap-1.5"
              >
                <RotateCcw size={14} />
                Replay Again
              </button>

              <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
                {[1, 2, 4].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setReplaySpeed(spd)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      replaySpeed === spd ? 'bg-pink-500 text-white' : 'text-slate-400'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons Hub */}
      <div className="w-full max-w-2xl flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {/* Watch Replay Button */}
        <button
          onClick={startReplay}
          className="btn-secondary py-3 px-5 text-xs sm:text-sm font-bold flex items-center gap-2"
        >
          <Play size={16} className="text-cyan-400 fill-cyan-400" />
          Watch Stroke Replay
        </button>

        {/* Download Match Card Button */}
        <button
          onClick={handleDownloadCard}
          disabled={downloadingCard}
          className="btn-secondary py-3 px-5 text-xs sm:text-sm font-bold flex items-center gap-2"
        >
          {downloadSuccess ? (
            <>
              <Check size={16} className="text-emerald-400" />
              <span>Card Saved!</span>
            </>
          ) : (
            <>
              <Download size={16} className="text-purple-400" />
              <span>{downloadingCard ? 'Generating Card...' : 'Save Match Card'}</span>
            </>
          )}
        </button>

        {/* Play Again (Next Round) Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onPlayAgain('same_level');
          }}
          className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl shadow-pink-500/25"
        >
          <Sparkles size={16} />
          <span>Play Next Round</span>
          <ArrowRight size={16} />
        </button>

        {/* Return to Lobby / Home */}
        <button
          onClick={() => {
            sounds.playClick();
            onLeaveRoom();
          }}
          className="text-xs text-slate-400 hover:text-white py-2 px-4 transition-colors"
        >
          Exit to Home
        </button>
      </div>
    </div>
  );
};
