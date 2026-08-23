import React, { useEffect, useState } from 'react';
import { ReactionEvent } from '../services/socketService';

interface FloatingReactionsProps {
  reactions: ReactionEvent[];
}

interface ActiveReaction extends ReactionEvent {
  left: number; // percentage across screen
}

export const FloatingReactions: React.FC<FloatingReactionsProps> = ({ reactions }) => {
  const [activeList, setActiveList] = useState<ActiveReaction[]>([]);

  useEffect(() => {
    if (reactions.length === 0) return;
    const latest = reactions[reactions.length - 1];

    const newReaction: ActiveReaction = {
      ...latest,
      left: Math.floor(Math.random() * 60 + 20), // between 20% and 80% screen width
    };

    setActiveList((prev) => [...prev, newReaction]);

    const timer = setTimeout(() => {
      setActiveList((prev) => prev.filter((r) => r.id !== latest.id));
    }, 2200);

    return () => clearTimeout(timer);
  }, [reactions]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {activeList.map((r) => (
        <div
          key={r.id}
          className="floating-emoji flex flex-col items-center select-none"
          style={{
            left: `${r.left}%`,
            bottom: '15%',
          }}
        >
          <span className="text-4xl filter drop-shadow-lg">{r.emoji}</span>
          <span className="text-[10px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded-full border border-white/20 mt-1 shadow-md">
            {r.senderName}
          </span>
        </div>
      ))}
    </div>
  );
};
