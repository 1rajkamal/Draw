import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Serve built frontend if dist directory exists
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  maxHttpBufferSize: 1e7, // 10MB for high-res drawing payloads
});

// Helper to get local network IP address for mobile QR codes
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.get('/api/server-info', (req, res) => {
  res.json({
    localIp: getLocalIpAddress(),
    port: process.env.PORT || 3001,
  });
});

// Room storage
const rooms = new Map();

// Helper to generate 6-character room codes (e.g. DUEL89, AB12CD)
function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // omit ambiguous chars like 0, O, 1, I
  let code = '';
  do {
    code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (rooms.has(code));
  return code;
}

// Clean up stale rooms (older than 4 hours)
setInterval(() => {
  const now = Date.now();
  for (const [code, room] of rooms.entries()) {
    if (now - room.createdAt > 4 * 60 * 60 * 1000) {
      rooms.delete(code);
    }
  }
}, 30 * 60 * 1000);

function getCleanRoomData(room) {
  return {
    code: room.code,
    level: room.level,
    timerDuration: room.timerDuration,
    selectedImageId: room.selectedImageId,
    state: room.state,
    hostPlayerId: room.hostPlayerId,
    winnerPlayerId: room.winnerPlayerId,
    isTie: room.isTie,
    drawingStartTime: room.drawingStartTime,
    players: Object.values(room.players).map(p => ({
      id: p.id,
      playerId: p.playerId,
      name: p.name,
      avatar: p.avatar,
      isHost: p.isHost,
      connected: p.connected,
      submitted: p.submitted,
      drawingDataUrl: p.drawingDataUrl,
      strokes: p.strokes || [],
      score: p.score,
      breakdown: p.breakdown,
    })),
  };
}

io.on('connection', (socket) => {
  let currentRoomCode = null;
  let currentPlayerId = null;

  // Create Room
  socket.on('create_room', ({ playerName, avatar, playerId }) => {
    const code = generateRoomCode();
    const pId = playerId || `p_${Math.random().toString(36).substring(2, 9)}`;

    const newRoom = {
      code,
      createdAt: Date.now(),
      level: 'easy',
      timerDuration: 120, // default seconds for easy
      selectedImageId: null,
      state: 'lobby', // lobby | selecting | drawing | result
      hostPlayerId: pId,
      winnerPlayerId: null,
      isTie: false,
      drawingStartTime: null,
      players: {
        [pId]: {
          id: socket.id,
          playerId: pId,
          name: (playerName || 'Player 1').trim().substring(0, 16),
          avatar: avatar || '🎨',
          isHost: true,
          connected: true,
          submitted: false,
          drawingDataUrl: null,
          strokes: [],
          score: null,
          breakdown: null,
        },
      },
    };

    rooms.set(code, newRoom);
    currentRoomCode = code;
    currentPlayerId = pId;

    socket.join(code);
    socket.emit('room_created', {
      room: getCleanRoomData(newRoom),
      playerId: pId,
      isHost: true,
    });
  });

  // Join Room
  socket.on('join_room', ({ roomCode, playerName, avatar, playerId }) => {
    const code = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);

    if (!room) {
      socket.emit('error_message', { message: `Room "${code}" not found. Please check the code!` });
      return;
    }

    const pId = playerId || `p_${Math.random().toString(36).substring(2, 9)}`;
    const existingPlayer = room.players[pId];

    // Check if room is full (max 2 players unless reconnecting)
    const activePlayers = Object.values(room.players);
    if (!existingPlayer && activePlayers.length >= 2) {
      socket.emit('error_message', { message: 'This room is already full (maximum 2 players).' });
      return;
    }

    if (existingPlayer) {
      // Reconnecting player
      existingPlayer.id = socket.id;
      existingPlayer.connected = true;
      if (playerName) existingPlayer.name = playerName.trim().substring(0, 16);
      if (avatar) existingPlayer.avatar = avatar;
    } else {
      // New Player 2
      room.players[pId] = {
        id: socket.id,
        playerId: pId,
        name: (playerName || 'Player 2').trim().substring(0, 16),
        avatar: avatar || '✨',
        isHost: false,
        connected: true,
        submitted: false,
        drawingDataUrl: null,
        strokes: [],
        score: null,
        breakdown: null,
      };
    }

    currentRoomCode = code;
    currentPlayerId = pId;
    socket.join(code);

    const roomData = getCleanRoomData(room);
    socket.emit('room_joined', {
      room: roomData,
      playerId: pId,
      isHost: room.hostPlayerId === pId,
    });

    // Notify other player
    io.to(code).emit('room_updated', roomData);
  });

  // Update Settings (Level & Timer)
  socket.on('set_level', ({ level, timerDuration }) => {
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    room.level = level;
    if (timerDuration !== undefined) {
      room.timerDuration = timerDuration;
    } else {
      // Auto-set standard duration by level
      room.timerDuration = level === 'easy' ? 120 : level === 'medium' ? 90 : 60;
    }

    io.to(currentRoomCode).emit('room_updated', getCleanRoomData(room));
  });

  // Navigate to Image Selection Screen
  socket.on('start_image_selection', () => {
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    room.state = 'selecting';
    room.selectedImageId = null;
    room.winnerPlayerId = null;
    room.isTie = false;

    // Reset player submissions
    Object.values(room.players).forEach(p => {
      p.submitted = false;
      p.drawingDataUrl = null;
      p.strokes = [];
      p.score = null;
      p.breakdown = null;
    });

    io.to(currentRoomCode).emit('room_updated', getCleanRoomData(room));
  });

  // Select Image & Start Drawing Round
  socket.on('select_image', ({ imageId }) => {
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    room.selectedImageId = imageId;
    room.state = 'drawing';
    room.drawingStartTime = Date.now();

    // Reset submission flags
    Object.values(room.players).forEach(p => {
      p.submitted = false;
      p.drawingDataUrl = null;
      p.strokes = [];
      p.score = null;
      p.breakdown = null;
    });

    io.to(currentRoomCode).emit('round_started', {
      room: getCleanRoomData(room),
      selectedImageId: imageId,
      timerDuration: room.timerDuration,
      startTime: room.drawingStartTime,
    });
  });

  // Submit Drawing & Scores
  socket.on('submit_drawing', ({ drawingDataUrl, strokes, score, breakdown }) => {
    if (!currentRoomCode || !currentPlayerId) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players[currentPlayerId];
    if (!player) return;

    player.submitted = true;
    player.drawingDataUrl = drawingDataUrl;
    player.strokes = strokes || [];
    player.score = typeof score === 'number' ? score : Math.floor(Math.random() * 30 + 60);
    player.breakdown = breakdown || { shape: 75, color: 80, detail: 75 };

    // Broadcast instant submission notification to all players in the room
    io.to(currentRoomCode).emit('player_submitted', {
      playerId: player.playerId,
      playerName: player.name,
      room: getCleanRoomData(room),
    });

    // Check if both players have submitted
    const playerList = Object.values(room.players);
    const allSubmitted = playerList.length > 0 && playerList.every(p => p.submitted);

    if (allSubmitted) {
      // Determine winner
      room.state = 'result';

      if (playerList.length === 2) {
        const [p1, p2] = playerList;
        if (p1.score === p2.score) {
          room.isTie = true;
          room.winnerPlayerId = null;
        } else if (p1.score > p2.score) {
          room.winnerPlayerId = p1.playerId;
          room.isTie = false;
        } else {
          room.winnerPlayerId = p2.playerId;
          room.isTie = false;
        }
      } else if (playerList.length === 1) {
        room.winnerPlayerId = playerList[0].playerId;
        room.isTie = false;
      }

      // Small delay before broadcasting results so animations feel organic
      setTimeout(() => {
        io.to(currentRoomCode).emit('round_results', getCleanRoomData(room));
      }, 500);
    }
  });

  // Play Again (rematch or choose new image)
  socket.on('play_again', ({ action }) => {
    // action: 'same_level' | 'new_level' | 'lobby'
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    Object.values(room.players).forEach(p => {
      p.submitted = false;
      p.drawingDataUrl = null;
      p.strokes = [];
      p.score = null;
      p.breakdown = null;
    });

    room.winnerPlayerId = null;
    room.isTie = false;

    if (action === 'same_level' || action === 'select_image') {
      room.state = 'selecting';
      room.selectedImageId = null;
    } else {
      room.state = 'lobby';
    }

    io.to(currentRoomCode).emit('room_updated', getCleanRoomData(room));
  });

  // Live Floating Emoji Reactions
  socket.on('send_reaction', ({ emoji }) => {
    if (!currentRoomCode || !currentPlayerId) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const sender = room.players[currentPlayerId];
    io.to(currentRoomCode).emit('reaction_received', {
      senderId: currentPlayerId,
      senderName: sender ? sender.name : 'Partner',
      emoji: emoji || '❤️',
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    });
  });

  // Handle Disconnects
  socket.on('disconnect', () => {
    if (currentRoomCode && currentPlayerId) {
      const room = rooms.get(currentRoomCode);
      if (room && room.players[currentPlayerId]) {
        room.players[currentPlayerId].connected = false;
        io.to(currentRoomCode).emit('player_disconnected', {
          playerId: currentPlayerId,
          room: getCleanRoomData(room),
        });
      }
    }
  });
});

// Wildcard fallback for SPA routing
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send('Drawing Duel server running. Run `npm run dev` to start frontend development.');
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🎨 Drawing Duel Server running on http://localhost:${PORT}`);
  console.log(`📱 LAN Mobile Access on http://${getLocalIpAddress()}:${PORT}`);
});
