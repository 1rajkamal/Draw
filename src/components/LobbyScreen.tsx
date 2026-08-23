import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Users, Crown, Copy, Check, Share2, Sparkles, Clock, ArrowRight, Heart } from 'lucide-react';
import { RoomData, Player } from '../services/socketService';
import { sounds } from '../utils/soundEffects';

interface LobbyScreenProps {
  room: RoomData;
  isHost: boolean;
  myPlayerId: string;
  onSetLevel: (level: 'easy' | 'medium' | 'hard', timerDuration?: number) => void;
  onProceedToSelection: () => void;
  onSendReaction: (emoji: string) => void;
  onLeaveRoom: () => void;
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({
  room,
  isHost,
  myPlayerId,
  onSetLevel,
  onProceedToSelection,
  onSendReaction,
  onLeaveRoom,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const inviteUrl = `${window.location.origin}/?join=${room.code}`;

  useEffect(() => {
    QRCode.toDataURL(inviteUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('QR generation failed', err));
  }, [inviteUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    sounds.playClick();
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareLink = async () => {
    sounds.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my Couple Drawing Duel! 💕',
          text: `Join my Couple Drawing Duel room with code ${room.code}! Let's see who draws better!`,
          url: inviteUrl,
        });
      } catch (e) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const player1 = room.players.find((p) => p.isHost) || room.players[0];
  const player2 = room.players.find((p) => !p.isHost) || room.players[1];
  const bothConnected = room.players.length >= 2 && room.players.every((p) => p.connected);

  return (
    <div className="w-full flex-1 max-w-5xl mx-auto p-4 sm:p-6 flex flex-col items-center justify-center">
      {/* Header Banner */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-3">
          <Heart size={14} className="text-pink-400 fill-pink-400" />
          <span>Couples Arena Lobby 💕</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Who's The Real Artist? 🎨
        </h2>
        <p className="text-sm text-slate-300 mt-1">
          {bothConnected
            ? 'Both partners in the arena! Host picks the difficulty and starts the duel!'
            : 'Send your partner the code or scan the QR code to pair up!'}
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Col: Connected Players & Invite Card (md:col-span-5) */}
        <div className="md:col-span-5 space-y-4">
          {/* Room Code Card */}
          <div className="glass-panel p-5 text-center relative overflow-hidden border border-pink-500/30">
            <span className="text-[11px] font-semibold tracking-wider text-pink-300 uppercase">
              Partner Invite Code 💕
            </span>
            <div className="my-2 py-2 px-4 rounded-xl bg-slate-800/90 border border-white/15 font-mono text-3xl sm:text-4xl font-black tracking-widest text-pink-400 select-all">
              {room.code}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedLink ? 'Copied Link!' : 'Copy Link'}
              </button>

              <button
                onClick={handleShareLink}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-bold text-cyan-300 flex items-center justify-center gap-1.5 transition-colors"
                title="Share via WhatsApp or Mobile"
              >
                <Share2 size={14} />
                WhatsApp
              </button>

              <button
                onClick={() => {
                  setShowQrModal(true);
                  sounds.playClick();
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-bold text-purple-300 flex items-center justify-center gap-1 transition-colors"
              >
                📱 QR
              </button>
            </div>
          </div>

          {/* Players Roster */}
          <div className="glass-panel p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Users size={14} />
              Couples Roster ({room.players.length}/2)
            </h3>

            <div className="space-y-3">
              {/* Player 1 (Host) */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-pink-500/30">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{player1?.avatar || '👸'}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white">{player1?.name || 'Player 1'}</span>
                      <Crown size={14} className="text-amber-400 fill-amber-400" />
                    </div>
                    <span className="text-[11px] text-pink-400 font-medium">👑 The Boss (Host)</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ready
                </div>
              </div>

              {/* Player 2 (Guest) */}
              {player2 ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-purple-500/30">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{player2.avatar || '🤴'}</span>
                    <div>
                      <span className="font-bold text-sm text-white">{player2.name}</span>
                      <span className="block text-[11px] text-purple-400 font-medium">💖 The Challenger</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Ready
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-pink-500/25 bg-slate-900/40 text-center">
                  <div className="w-8 h-8 rounded-full bg-slate-800 mx-auto flex items-center justify-center mb-2 animate-bounce">
                    <span className="text-sm">⏳</span>
                  </div>
                  <p className="text-xs font-semibold text-pink-300">Waiting for your partner to join...</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Tell them to enter code <strong className="text-pink-400">{room.code}</strong></p>
                </div>
              )}
            </div>

            {/* Quick Reactions Bar */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <span className="text-[11px] text-slate-400 block mb-2">Send sweet/funny reaction:</span>
              <div className="flex items-center gap-2">
                {['💖', '😘', '🔥', '😂', '🥺', '👑', '👀'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      onSendReaction(emoji);
                      sounds.playPop();
                    }}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/5 flex items-center justify-center text-sm hover:scale-125 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Level & Timer Settings (md:col-span-7) */}
        <div className="md:col-span-7 glass-panel p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white">Choose Battle Intensity</h3>
              {!isHost && (
                <span className="text-xs text-pink-400 italic">Host decides rules!</span>
              )}
            </div>

            {/* 3 Difficulty Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Easy */}
              <button
                type="button"
                disabled={!isHost}
                onClick={() => {
                  onSetLevel('easy', 120);
                  sounds.playClick();
                }}
                className={`p-4 rounded-xl text-left border transition-all ${
                  room.level === 'easy'
                    ? 'bg-emerald-500/15 border-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800/60 border-white/10 hover:bg-slate-800'
                } ${!isHost ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">🌱</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    EASY
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">Cute & Chill</h4>
                <p className="text-[11px] text-slate-400 mt-1">Simple doodles. Zero relationship damage! 120s.</p>
              </button>

              {/* Medium */}
              <button
                type="button"
                disabled={!isHost}
                onClick={() => {
                  onSetLevel('medium', 90);
                  sounds.playClick();
                }}
                className={`p-4 rounded-xl text-left border transition-all ${
                  room.level === 'medium'
                    ? 'bg-amber-500/15 border-amber-500 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800/60 border-white/10 hover:bg-slate-800'
                } ${!isHost ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    MEDIUM
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">Playful Duel</h4>
                <p className="text-[11px] text-slate-400 mt-1">Fun cartoon props. Minor ego at stake! 90s.</p>
              </button>

              {/* Hard */}
              <button
                type="button"
                disabled={!isHost}
                onClick={() => {
                  onSetLevel('hard', 60);
                  sounds.playClick();
                }}
                className={`p-4 rounded-xl text-left border transition-all ${
                  room.level === 'hard'
                    ? 'bg-rose-500/15 border-rose-500 shadow-lg shadow-rose-500/20'
                    : 'bg-slate-800/60 border-white/10 hover:bg-slate-800'
                } ${!isHost ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">🔥</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                    HARD
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">Savage Test</h4>
                <p className="text-[11px] text-slate-400 mt-1">Loser cooks dinner tonight! 60s.</p>
              </button>
            </div>
          </div>

          {/* Timer Configuration */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Clock size={14} />
              Round Timer
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '60s (Speedrun)', val: 60 },
                { label: '90s (Standard)', val: 90 },
                { label: '120s (Relaxed)', val: 120 },
                { label: '180s (Artist Mode)', val: 180 },
                { label: 'Untimed', val: 0 },
              ].map((t) => (
                <button
                  key={t.val}
                  type="button"
                  disabled={!isHost}
                  onClick={() => {
                    onSetLevel(room.level, t.val);
                    sounds.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    room.timerDuration === t.val
                      ? 'bg-pink-500 text-white border-pink-400 shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 border-white/10 hover:bg-slate-700'
                  } ${!isHost ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Start Selection Action */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onLeaveRoom}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Exit to Home
            </button>

            {isHost ? (
              <button
                onClick={() => {
                  sounds.playClick();
                  onProceedToSelection();
                }}
                className="btn-primary w-full sm:w-auto py-3 px-6 text-sm shadow-xl shadow-pink-500/25"
              >
                <span>Pick Drawing Cartoon</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <div className="text-xs text-pink-300 font-semibold px-4 py-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 animate-pulse text-center">
                Waiting for host to choose the prompt... 🎨
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Modal for Phone Joining */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-sm p-6 text-center relative border border-pink-500/30">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
            >
              ✕
            </button>

            <span className="text-3xl mb-1 block">📱💕</span>
            <h3 className="text-lg font-bold text-white">Join on Partner's Phone</h3>
            <p className="text-xs text-slate-300 mt-1 mb-4">
              Point their camera at this QR code to join your room instantly:
            </p>

            {qrCodeUrl && (
              <div className="p-3 bg-white rounded-2xl inline-block shadow-xl mx-auto mb-4">
                <img src={qrCodeUrl} alt="Room QR Code" className="w-56 h-56 rounded-lg" />
              </div>
            )}

            <div className="font-mono text-xl font-black text-pink-400 tracking-widest mb-3">
              CODE: {room.code}
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="btn-secondary w-full py-2.5 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
