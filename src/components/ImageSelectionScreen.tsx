import React, { useState } from 'react';
import { REFERENCE_IMAGES, ReferenceDrawing } from '../data/referenceImages';
import { RoomData } from '../services/socketService';
import { Sparkles, Eye, ArrowLeft, Play, Info } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ImageSelectionScreenProps {
  room: RoomData;
  isHost: boolean;
  onSelectImage: (imageId: string) => void;
  onBackToLobby: () => void;
}

export const ImageSelectionScreen: React.FC<ImageSelectionScreenProps> = ({
  room,
  isHost,
  onSelectImage,
  onBackToLobby,
}) => {
  const images = REFERENCE_IMAGES.filter((img) => img.difficulty === room.level);
  const [selectedId, setSelectedId] = useState<string>(images[0]?.id || '');
  const [previewDrawing, setPreviewDrawing] = useState<ReferenceDrawing | null>(null);

  const selectedDrawing = REFERENCE_IMAGES.find((img) => img.id === selectedId) || images[0];

  const handleConfirm = () => {
    if (!selectedId) return;
    sounds.playSubmit();
    onSelectImage(selectedId);
  };

  return (
    <div className="w-full flex-1 max-w-6xl mx-auto p-4 sm:p-6 flex flex-col">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => {
                sounds.playClick();
                onBackToLobby();
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Back to Lobby"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
              Round 1 • {room.level.toUpperCase()} LEVEL
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Choose Reference Drawing
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {isHost
              ? 'Select 1 of the 10 cartoon artworks below for this drawing duel round!'
              : 'Host is picking the reference drawing for this round...'}
          </p>
        </div>

        {/* Selected Image Mini-Preview & Start Button */}
        {selectedDrawing && (
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-800/80 border border-white/10 shrink-0">
            <div
              className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0"
              dangerouslySetInnerHTML={{ __html: selectedDrawing.svg }}
            />
            <div className="pr-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Selected:</span>
              <span className="text-xs font-bold text-white truncate max-w-[120px] block">
                {selectedDrawing.title}
              </span>
            </div>

            {isHost ? (
              <button
                onClick={handleConfirm}
                className="btn-primary py-2 px-4 text-xs font-bold shrink-0"
              >
                <Play size={14} className="fill-white" />
                Start Duel!
              </button>
            ) : (
              <div className="text-[11px] text-purple-300 font-semibold px-2 py-1 bg-purple-500/20 rounded-lg animate-pulse">
                Ready!
              </div>
            )}
          </div>
        )}
      </div>

      {/* 10-Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 flex-1 items-stretch">
        {images.map((item, index) => {
          const isSelected = selectedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                if (isHost) {
                  setSelectedId(item.id);
                  sounds.playClick();
                } else {
                  setPreviewDrawing(item);
                }
              }}
              className={`glass-panel p-3 flex flex-col justify-between rounded-2xl cursor-pointer transition-all relative overflow-hidden group ${
                isSelected
                  ? 'border-2 border-pink-500 shadow-xl shadow-pink-500/25 scale-[1.02] bg-slate-800/90'
                  : 'hover:border-white/30 hover:scale-[1.01] bg-slate-900/60'
              }`}
            >
              {/* Card Index Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  #{index + 1}
                </span>
                <span className="text-[10px] font-bold text-pink-300 bg-pink-500/10 px-1.5 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              {/* Artwork Render */}
              <div
                className="w-full aspect-square rounded-xl overflow-hidden bg-slate-950/80 border border-white/5 p-1 flex items-center justify-center my-1 group-hover:scale-105 transition-transform"
                dangerouslySetInnerHTML={{ __html: item.svg }}
              />

              {/* Title & Info */}
              <div className="mt-2">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex gap-1">
                    {item.palette.slice(0, 3).map((c, i) => (
                      <span
                        key={i}
                        className="w-2.5 h-2.5 rounded-full border border-black/30"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewDrawing(item);
                      sounds.playClick();
                    }}
                    className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
                    title="View details & tips"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>

              {/* Selection Checkmark */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-pink-500 text-white text-[11px] font-bold flex items-center justify-center shadow-md">
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Preview & Drawing Tips Modal */}
      {previewDrawing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md p-6 relative">
            <button
              onClick={() => setPreviewDrawing(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 uppercase">
                {previewDrawing.category}
              </span>
              <h3 className="text-lg font-bold text-white">{previewDrawing.title}</h3>
            </div>

            <div
              className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 p-4 mb-4"
              dangerouslySetInnerHTML={{ __html: previewDrawing.svg }}
            />

            <div className="p-3 rounded-xl bg-slate-800/80 border border-white/10 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 mb-1">
                <Info size={14} />
                Drawing Tip / Hint:
              </div>
              <p className="text-xs text-slate-300">{previewDrawing.hint}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-medium">Palette:</span>
                {previewDrawing.palette.map((c, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>

              {isHost && (
                <button
                  onClick={() => {
                    setSelectedId(previewDrawing.id);
                    setPreviewDrawing(null);
                    sounds.playClick();
                  }}
                  className="btn-primary py-2 px-4 text-xs font-bold"
                >
                  Select this Artwork
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
