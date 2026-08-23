import React, { useState } from 'react';
import { Users, Palette, Play, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface HomeScreenProps {
  onCreateRoom: (name: string, avatar: string) => void;
  onJoinRoom: (code: string, name: string, avatar: string) => void;
  onStartSolo: (name: string, avatar: string) => void;
  initialCode?: string;
}

const AVATARS = ['🎨', '🦊', '🐱', '🦉', '🦜', '🌸', '👶', '🍕', '⭐', '😜', '🚀', '🎮'];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onCreateRoom,
  onJoinRoom,
  onStartSolo,
  initialCode = '',
}) => {
  const [tab, setTab] = useState<'create' | 'join'>('create');
  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem('drawing_duel_player_name') || '';
  });
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    return localStorage.getItem('drawing_duel_player_avatar') || '🎨';
  });
  const [roomCodeInput, setRoomCodeInput] = useState(initialCode);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = (name: string, avatar: string) => {
    localStorage.setItem('drawing_duel_player_name', name);
    localStorage.setItem('drawing_duel_player_avatar', avatar);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter your name!');
      return;
    }
    setError('');
    setLoading(true);
    sounds.playClick();
    handleSaveProfile(playerName.trim(), selectedAvatar);
    try {
      await onCreateRoom(playerName.trim(), selectedAvatar);
    } catch (err: any) {
      setError(err?.message || 'Could not connect to room server.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter your name!');
      return;
    }
    if (!roomCodeInput.trim() || roomCodeInput.trim().length < 4) {
      setError('Please enter a valid 6-character room code!');
      return;
    }
    setError('');
    setLoading(true);
    sounds.playClick();
    handleSaveProfile(playerName.trim(), selectedAvatar);
    try {
      await onJoinRoom(roomCodeInput.trim().toUpperCase(), playerName.trim(), selectedAvatar);
    } catch (err: any) {
      setError(err?.message || 'Could not join room.');
    } finally {
      setLoading(false);
    }
  };

  const handleSolo = () => {
    const finalName = playerName.trim() || 'Artist';
    handleSaveProfile(finalName, selectedAvatar);
    sounds.playClick();
    onStartSolo(finalName, selectedAvatar);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mb-8 md:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-rose-500/20 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-bold mb-4 shadow-lg shadow-pink-500/10">
          <Sparkles size={15} className="text-pink-400 animate-pulse" />
          <span>Real-Time 2-Player Cartoon Drawing Showdown ⚡</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Draw Together. <br className="hidden sm:inline" />
          <span className="gradient-text-pink">Compete for Glory! 🎨</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Pick a cartoon prompt (Oggy, Bheem, Owl, Parrot, Baby, Flower & more), race the clock, and let AI score who drew it best!
        </p>
      </div>

      {/* Main Action Hub */}
      <div className="w-full max-w-md grid grid-cols-1 gap-6">
        <div className="glass-panel p-6 sm:p-8 relative overflow-hidden border border-pink-500/30">
          {/* Subtle Accent Glow */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Profile Setup */}
          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Your Display Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Raj"
                maxLength={16}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-white/15 text-white placeholder-slate-500 font-medium focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Avatar Selector */}
            <div className="mt-3">
              <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                Choose Avatar
              </label>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => {
                      setSelectedAvatar(av);
                      sounds.playClick();
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform ${
                      selectedAvatar === av
                        ? 'bg-pink-500/30 border-2 border-pink-500 scale-110 shadow-md'
                        : 'bg-slate-800/60 border border-white/10 hover:bg-slate-700/60'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex p-1 rounded-xl bg-slate-800/80 border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => {
                setTab('create');
                setError('');
                sounds.playClick();
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                tab === 'create'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users size={16} />
              Create Room
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('join');
                setError('');
                sounds.playClick();
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                tab === 'join'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play size={16} />
              Join Room
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              ⚠️ {error}
            </div>
          )}

          {/* Forms */}
          {tab === 'create' ? (
            <form onSubmit={handleCreate} className="space-y-4">
              <p className="text-xs text-slate-300">
                You'll get an invite code & QR to share with Player 2. No app install needed!
              </p>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-base shadow-xl shadow-pink-500/30"
              >
                {loading ? 'Creating Room...' : 'Start Duo Room 🚀'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  6-Character Room Code
                </label>
                <input
                  type="text"
                  value={roomCodeInput}
                  onChange={(e) => {
                    setRoomCodeInput(e.target.value.toUpperCase());
                    setError('');
                  }}
                  placeholder="e.g. AB12CD"
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-white/15 text-white font-mono tracking-widest text-center text-lg font-bold placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors uppercase"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-14 font-display font-bold text-base bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 transition-all"
              >
                {loading ? 'Joining Room...' : 'Join Room 🎮'}
              </button>
            </form>
          )}

          {/* Solo Practice Mode Action */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-200">Practice drawing solo?</p>
              <p className="text-[11px] text-slate-400">Warm up your sketching skills first</p>
            </div>
            <button
              onClick={handleSolo}
              type="button"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-colors"
            >
              <Palette size={14} />
              Solo Mode
            </button>
          </div>
        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-pink-500/20 backdrop-blur-sm">
            <span className="text-2xl mb-1 block">🐱</span>
            <h4 className="text-xs font-bold text-white">30 Cartoons</h4>
            <p className="text-[10px] text-pink-300 mt-0.5">Oggy, Bheem & More</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-sm">
            <span className="text-2xl mb-1 block">🤖</span>
            <h4 className="text-xs font-bold text-white">AI Scoring</h4>
            <p className="text-[10px] text-purple-300 mt-0.5">SSIM & Shape Match</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-sm">
            <span className="text-2xl mb-1 block">⏱️</span>
            <h4 className="text-xs font-bold text-white">Time-Lapse</h4>
            <p className="text-[10px] text-cyan-300 mt-0.5">Stroke Replay</p>
          </div>
        </div>
      </div>
    </div>
  );
};
