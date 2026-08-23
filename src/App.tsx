import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { LobbyScreen } from './components/LobbyScreen';
import { ImageSelectionScreen } from './components/ImageSelectionScreen';
import { DrawingScreen } from './components/DrawingScreen';
import { ResultScreen } from './components/ResultScreen';
import { FloatingReactions } from './components/FloatingReactions';
import { socketService, RoomData, ReactionEvent } from './services/socketService';
import { ScoreResult } from './utils/scoringEngine';
import { sounds } from './utils/soundEffects';

export const App: React.FC = () => {
  const [room, setRoom] = useState<RoomData | null>(null);
  const [screen, setScreen] = useState<'home' | 'lobby' | 'selecting' | 'drawing' | 'result'>('home');
  const [isHost, setIsHost] = useState(false);
  const [myPlayerId, setMyPlayerId] = useState(socketService.getPlayerId());
  const [selectedImageId, setSelectedImageId] = useState<string>('easy-1');
  const [reactions, setReactions] = useState<ReactionEvent[]>([]);
  const [connected, setConnected] = useState(true);
  const [isSolo, setIsSolo] = useState(false);

  // Check URL query parameters for auto-join links (e.g. ?join=AB12CD)
  const [initialJoinCode, setInitialJoinCode] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const joinCode = params.get('join');
    if (joinCode) {
      setInitialJoinCode(joinCode.toUpperCase());
    }
  }, []);

  // Initialize Socket Event Subscriptions
  useEffect(() => {
    const socket = socketService.connect();

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    const unsubRoom = socketService.onRoomUpdated((updatedRoom) => {
      setRoom(updatedRoom);
      if (updatedRoom.state === 'lobby') setScreen('lobby');
      else if (updatedRoom.state === 'selecting') setScreen('selecting');
      else if (updatedRoom.state === 'drawing') setScreen('drawing');
      else if (updatedRoom.state === 'result') setScreen('result');
    });

    const unsubRoundStart = socketService.onRoundStarted((data) => {
      setRoom(data.room);
      setSelectedImageId(data.selectedImageId);
      setScreen('drawing');
    });

    const unsubPlayerSubmitted = socketService.onPlayerSubmitted((data) => {
      setRoom(data.room);
      if (data.playerId !== myPlayerId) {
        sounds.playPop();
      }
    });

    const unsubResults = socketService.onRoundResults((resultRoom) => {
      setRoom(resultRoom);
      setScreen('result');
    });

    const unsubReaction = socketService.onReaction((reaction) => {
      setReactions((prev) => [...prev, reaction]);
      if (reaction.senderId !== myPlayerId) {
        sounds.playPop();
      }
    });

    return () => {
      unsubRoom();
      unsubRoundStart();
      unsubPlayerSubmitted();
      unsubResults();
      unsubReaction();
    };
  }, [myPlayerId]);

  // Actions
  const handleCreateRoom = async (name: string, avatar: string) => {
    setIsSolo(false);
    const res = await socketService.createRoom(name, avatar);
    setRoom(res.room);
    setIsHost(res.isHost);
    setMyPlayerId(socketService.getPlayerId());
    setScreen('lobby');
  };

  const handleJoinRoom = async (code: string, name: string, avatar: string) => {
    setIsSolo(false);
    const res = await socketService.joinRoom(code, name, avatar);
    setRoom(res.room);
    setIsHost(res.isHost);
    setMyPlayerId(socketService.getPlayerId());
    setScreen(res.room.state as any);
  };

  const handleStartSolo = (name: string, avatar: string) => {
    setIsSolo(true);
    setIsHost(true);
    const soloRoom: RoomData = {
      code: 'SOLO01',
      level: 'easy',
      timerDuration: 120,
      selectedImageId: 'easy-1',
      state: 'selecting',
      hostPlayerId: 'p_solo',
      winnerPlayerId: null,
      isTie: false,
      drawingStartTime: null,
      players: [
        {
          id: 'solo_1',
          playerId: 'p_solo',
          name,
          avatar,
          isHost: true,
          connected: true,
          submitted: false,
          drawingDataUrl: null,
          strokes: [],
          score: null,
          breakdown: null,
        },
      ],
    };
    setRoom(soloRoom);
    setMyPlayerId('p_solo');
    setScreen('selecting');
  };

  const handleSetLevel = (level: 'easy' | 'medium' | 'hard', timerDuration?: number) => {
    if (isSolo && room) {
      setRoom({
        ...room,
        level,
        timerDuration: timerDuration ?? (level === 'easy' ? 120 : level === 'medium' ? 90 : 60),
      });
    } else {
      socketService.setLevel(level, timerDuration);
    }
  };

  const handleProceedToSelection = () => {
    if (isSolo && room) {
      setRoom({ ...room, state: 'selecting' });
      setScreen('selecting');
    } else {
      socketService.startImageSelection();
    }
  };

  const handleSelectImage = (imageId: string) => {
    setSelectedImageId(imageId);
    if (isSolo && room) {
      setRoom({
        ...room,
        selectedImageId: imageId,
        state: 'drawing',
        drawingStartTime: Date.now(),
      });
      setScreen('drawing');
    } else {
      socketService.selectImage(imageId);
    }
  };

  const handleSubmitDrawing = (
    drawingDataUrl: string,
    strokes: any[],
    score: number,
    breakdown: ScoreResult
  ) => {
    if (isSolo && room) {
      const updatedPlayer = {
        ...room.players[0],
        submitted: true,
        drawingDataUrl,
        strokes,
        score,
        breakdown,
      };
      setRoom({
        ...room,
        state: 'result',
        winnerPlayerId: updatedPlayer.playerId,
        players: [updatedPlayer],
      });
      setScreen('result');
    } else {
      socketService.submitDrawing(drawingDataUrl, strokes, score, breakdown);
    }
  };

  const handlePlayAgain = (action: 'same_level' | 'new_level' | 'lobby') => {
    if (isSolo && room) {
      const resetPlayers = room.players.map((p) => ({
        ...p,
        submitted: false,
        drawingDataUrl: null,
        strokes: [],
        score: null,
        breakdown: null,
      }));
      setRoom({
        ...room,
        state: 'selecting',
        players: resetPlayers,
      });
      setScreen('selecting');
    } else {
      socketService.playAgain(action);
    }
  };

  const handleSendReaction = (emoji: string) => {
    if (!isSolo) {
      socketService.sendReaction(emoji);
    } else {
      setReactions((prev) => [
        ...prev,
        {
          senderId: myPlayerId,
          senderName: 'You',
          emoji,
          id: Math.random().toString(36).substring(2, 9),
          timestamp: Date.now(),
        },
      ]);
    }
  };

  const handleLeaveRoom = () => {
    setRoom(null);
    setScreen('home');
    setIsSolo(false);
    // Remove query params from address bar cleanly
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-pink-500 selection:text-white">
      {/* Floating Reactions Overlay */}
      <FloatingReactions reactions={reactions} />

      {/* Main Top Navigation */}
      <Navbar
        roomCode={room?.code}
        connected={connected}
        onLeaveRoom={screen !== 'home' ? handleLeaveRoom : undefined}
      />

      {/* Screen Router */}
      <main className="flex-1 flex flex-col relative z-10">
        {screen === 'home' && (
          <HomeScreen
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
            onStartSolo={handleStartSolo}
            initialCode={initialJoinCode}
          />
        )}

        {screen === 'lobby' && room && (
          <LobbyScreen
            room={room}
            isHost={isHost}
            myPlayerId={myPlayerId}
            onSetLevel={handleSetLevel}
            onProceedToSelection={handleProceedToSelection}
            onSendReaction={handleSendReaction}
            onLeaveRoom={handleLeaveRoom}
          />
        )}

        {screen === 'selecting' && room && (
          <ImageSelectionScreen
            room={room}
            isHost={isHost}
            onSelectImage={handleSelectImage}
            onBackToLobby={() => (isSolo ? handleLeaveRoom() : setScreen('lobby'))}
          />
        )}

        {screen === 'drawing' && room && (
          <DrawingScreen
            room={room}
            myPlayerId={myPlayerId}
            selectedImageId={room.selectedImageId || selectedImageId}
            isSolo={isSolo}
            onSubmit={handleSubmitDrawing}
            onSendReaction={handleSendReaction}
          />
        )}

        {screen === 'result' && room && (
          <ResultScreen
            room={room}
            myPlayerId={myPlayerId}
            selectedImageId={room.selectedImageId || selectedImageId}
            isSolo={isSolo}
            onPlayAgain={handlePlayAgain}
            onLeaveRoom={handleLeaveRoom}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-3 px-4 border-t border-white/5 bg-slate-950/80 backdrop-blur-sm text-center text-xs text-slate-400">
        <p>
          🎨 Drawing Duel — Real-Time Couple Game • Built with HTML5 Canvas & Computer Vision Accuracy Scoring
        </p>
      </footer>
    </div>
  );
};
