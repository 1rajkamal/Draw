import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, HelpCircle, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  roomCode?: string;
  connected?: boolean;
  onLeaveRoom?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  roomCode,
  connected = true,
  onLeaveRoom,
}) => {
  const [isMuted, setIsMuted] = useState(sounds.isMuted());
  const [copied, setCopied] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const handleToggleSound = () => {
    const next = sounds.toggleMute();
    setIsMuted(next);
    if (!next) sounds.playClick();
  };

  const handleCopyCode = () => {
    if (!roomCode) return;
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    sounds.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="w-full px-4 py-3 border-b border-white/10 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            onClick={onLeaveRoom}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/25 group-hover:scale-105 transition-transform">
              <span className="text-xl">🎨</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-pink-400 transition-colors">
                  Drawing Duel
                </span>
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-pink-300 border border-pink-500/40 flex items-center gap-1">
                  <Sparkles size={10} className="text-pink-400" />
                  2-PLAYER LIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Real-Time Cartoon Drawing Battle ⚡
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Room Code Badge */}
            {roomCode && (
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-pink-500/30 text-xs font-mono text-pink-300 transition-colors"
                title="Click to copy room code"
              >
                <span className="text-slate-400 font-sans hidden xs:inline">Room Code:</span>
                <span className="font-bold tracking-widest">{roomCode}</span>
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-slate-400" />}
              </button>
            )}

            {/* Connection Indicator */}
            <div
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/60 border border-white/5 text-[11px] font-medium text-slate-300 select-none"
              title={connected ? 'Connected live' : 'Connecting...'}
            >
              <span className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              <span className="hidden md:inline">{connected ? 'Live' : 'Connecting'}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX size={18} className="text-rose-400" /> : <Volume2 size={18} className="text-pink-400" />}
            </button>

            {/* How to play / Rules */}
            <button
              onClick={() => {
                setShowRules(true);
                sounds.playClick();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="How to play"
              aria-label="Game Rules"
            >
              <HelpCircle size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border border-pink-500/30">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="text-pink-400" size={22} />
                <h3 className="text-xl font-display text-white">How Drawing Duel Works 🎨</h3>
              </div>
              <button
                onClick={() => setShowRules(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm text-slate-300 leading-relaxed">
              <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-800/50 border border-pink-500/20">
                <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center shrink-0">1</span>
                <p><strong className="text-white">Create Room & Invite Partner:</strong> One player creates a 6-character room code and sends the link or shows the QR code.</p>
              </div>

              <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-800/50 border border-purple-500/20">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0">2</span>
                <p><strong className="text-white">Pick a Cartoon Prompt:</strong> Choose difficulty (Easy / Medium / Hard) and select a cartoon to draw (Oggy, Bheem, Owl, Parrot, Baby, Flower, etc.).</p>
              </div>

              <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-800/50 border border-cyan-500/20">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">3</span>
                <p><strong className="text-white">Race Against The Clock:</strong> Use brushes, pens, and colors to copy the drawing before your timer hits 0s!</p>
              </div>

              <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-800/50 border border-amber-500/20">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">4</span>
                <p><strong className="text-white">AI Accuracy Scoring:</strong> The AI scores both drawings side-by-side on edge contours, color matching, and accuracy to crown the winner!</p>
              </div>

              <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-800/50 border border-emerald-500/20">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">5</span>
                <p><strong className="text-white">Watch Replay & Save Postcard:</strong> Watch the stroke-by-stroke time-lapse replay and download your match postcard!</p>
              </div>
            </div>

            <button
              onClick={() => setShowRules(false)}
              className="btn-primary w-full mt-6 py-3"
            >
              Let's Play! 🎨
            </button>
          </div>
        </div>
      )}
    </>
  );
};
