import { io, Socket } from 'socket.io-client';
import Peer, { DataConnection } from 'peerjs';

export interface Player {
  id: string;
  playerId: string;
  name: string;
  avatar: string;
  isHost: boolean;
  connected: boolean;
  submitted: boolean;
  drawingDataUrl: string | null;
  strokes: Array<any>;
  score: number | null;
  breakdown: { shape: number; color: number; detail: number } | null;
}

export interface RoomData {
  code: string;
  level: 'easy' | 'medium' | 'hard';
  timerDuration: number;
  selectedImageId: string | null;
  state: 'lobby' | 'selecting' | 'drawing' | 'result';
  hostPlayerId: string;
  winnerPlayerId: string | null;
  isTie: boolean;
  drawingStartTime: number | null;
  players: Player[];
}

export interface ReactionEvent {
  senderId: string;
  senderName: string;
  emoji: string;
  id: string;
  timestamp: number;
}

type EventCallback = (...args: any[]) => void;

class HybridNetworkService {
  private socket: Socket | null = null;
  private peer: Peer | null = null;
  private peerConn: DataConnection | null = null;
  private broadcastChannel: BroadcastChannel | null = null;

  private mode: 'socket' | 'p2p' = 'socket';
  private currentRoom: RoomData | null = null;
  private myPlayerId: string = '';
  private isHost: boolean = false;
  private listeners: Map<string, Set<EventCallback>> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      let storedId = sessionStorage.getItem('drawing_duel_player_id');
      if (!storedId) {
        storedId = `p_${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem('drawing_duel_player_id', storedId);
      }
      this.myPlayerId = storedId;
    }
  }

  public getPlayerId(): string {
    return this.myPlayerId;
  }

  public getIsHost(): boolean {
    return this.isHost;
  }

  private emitLocal(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => cb(data));
    }
  }

  private onLocal(event: string, callback: EventCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  // Generate 6-char room codes (e.g. AB12CD)
  private generateCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // ================= P2P WebRTC Fallback Engine (for Vercel) =================
  private initP2PHost(code: string, playerName: string, avatar: string): Promise<{ room: RoomData; isHost: boolean }> {
    this.mode = 'p2p';
    this.isHost = true;

    const initialRoom: RoomData = {
      code,
      level: 'easy',
      timerDuration: 120,
      selectedImageId: null,
      state: 'lobby',
      hostPlayerId: this.myPlayerId,
      winnerPlayerId: null,
      isTie: false,
      drawingStartTime: null,
      players: [
        {
          id: 'p1',
          playerId: this.myPlayerId,
          name: playerName.trim().substring(0, 16),
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

    this.currentRoom = initialRoom;

    // Setup local multi-tab BroadcastChannel
    try {
      this.broadcastChannel = new BroadcastChannel(`drawing_duel_${code}`);
      this.broadcastChannel.onmessage = (e) => this.handleP2PMessage(e.data);
    } catch {
      // BroadcastChannel not available
    }

    return new Promise((resolve) => {
      // Initialize PeerJS host
      const peerId = `duel_${code.toLowerCase()}`;
      this.peer = new Peer(peerId, {
        debug: 1,
      });

      this.peer.on('open', () => {
        console.log('🌐 P2P Room Host active with Peer ID:', peerId);
      });

      this.peer.on('connection', (conn) => {
        this.peerConn = conn;
        this.setupPeerListeners(conn);
      });

      this.peer.on('error', (err) => {
        console.warn('Peer error (host):', err);
      });

      resolve({
        room: initialRoom,
        isHost: true,
      });
    });
  }

  private initP2PGuest(code: string, playerName: string, avatar: string): Promise<{ room: RoomData; isHost: boolean }> {
    this.mode = 'p2p';
    this.isHost = false;

    return new Promise((resolve, reject) => {
      const guestPeerId = `duel_guest_${Math.random().toString(36).substring(2, 9)}`;
      this.peer = new Peer(guestPeerId, { debug: 1 });

      const hostPeerId = `duel_${code.toLowerCase()}`;
      let connected = false;

      // Also listen on BroadcastChannel for dual-tab play
      try {
        this.broadcastChannel = new BroadcastChannel(`drawing_duel_${code}`);
        this.broadcastChannel.onmessage = (e) => this.handleP2PMessage(e.data);
        // Announce join via broadcast
        this.broadcastChannel.postMessage({
          type: 'join_request',
          player: {
            playerId: this.myPlayerId,
            name: playerName,
            avatar,
          },
        });
      } catch {
        // BroadcastChannel fallback
      }

      const timeout = setTimeout(() => {
        if (!connected) {
          reject(new Error(`Could not find room "${code}". Please verify the code!`));
        }
      }, 7000);

      this.peer.on('open', () => {
        const conn = this.peer!.connect(hostPeerId, { reliable: true });
        this.peerConn = conn;

        conn.on('open', () => {
          connected = true;
          clearTimeout(timeout);
          this.setupPeerListeners(conn);

          // Send join payload to host
          conn.send({
            type: 'join_request',
            player: {
              playerId: this.myPlayerId,
              name: playerName,
              avatar,
            },
          });
        });

        conn.on('error', (err) => {
          clearTimeout(timeout);
          reject(new Error(`Failed to connect to room "${code}": ${err.message}`));
        });
      });

      this.peer.on('error', (err) => {
        clearTimeout(timeout);
        reject(new Error(`Room "${code}" not found: ${err.message}`));
      });

      // Hook one-time room_joined
      const unsub = this.onLocal('room_joined', (data) => {
        unsub();
        connected = true;
        clearTimeout(timeout);
        resolve(data);
      });
    });
  }

  private setupPeerListeners(conn: DataConnection) {
    conn.on('data', (data: any) => {
      this.handleP2PMessage(data);
    });

    conn.on('close', () => {
      if (this.currentRoom) {
        const partner = this.currentRoom.players.find((p) => p.playerId !== this.myPlayerId);
        if (partner) partner.connected = false;
        this.emitLocal('room_updated', this.currentRoom);
      }
    });
  }

  private sendP2P(data: any) {
    if (this.peerConn && this.peerConn.open) {
      this.peerConn.send(data);
    }
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(data);
      } catch {
        // Broadcast error
      }
    }
  }

  private handleP2PMessage(msg: any) {
    if (!msg || !msg.type) return;

    if (msg.type === 'join_request' && this.isHost && this.currentRoom) {
      // Host adds guest player
      const guestPlayer: Player = {
        id: 'p2',
        playerId: msg.player.playerId,
        name: msg.player.name,
        avatar: msg.player.avatar,
        isHost: false,
        connected: true,
        submitted: false,
        drawingDataUrl: null,
        strokes: [],
        score: null,
        breakdown: null,
      };

      const existingIdx = this.currentRoom.players.findIndex((p) => p.playerId === guestPlayer.playerId);
      if (existingIdx >= 0) {
        this.currentRoom.players[existingIdx] = guestPlayer;
      } else {
        this.currentRoom.players = [this.currentRoom.players[0], guestPlayer];
      }

      this.emitLocal('room_updated', this.currentRoom);
      this.sendP2P({
        type: 'room_sync',
        room: this.currentRoom,
      });
    } else if (msg.type === 'room_sync') {
      this.currentRoom = msg.room;
      this.emitLocal('room_updated', msg.room);
      this.emitLocal('room_joined', { room: msg.room, isHost: false });
    } else if (msg.type === 'round_started') {
      this.currentRoom = msg.room;
      this.emitLocal('round_started', msg);
    } else if (msg.type === 'player_submitted') {
      if (this.currentRoom) {
        const p = this.currentRoom.players.find((x) => x.playerId === msg.playerId);
        if (p) {
          p.submitted = true;
          p.drawingDataUrl = msg.drawingDataUrl;
          p.strokes = msg.strokes;
          p.score = msg.score;
          p.breakdown = msg.breakdown;
        }

        this.emitLocal('player_submitted', {
          playerId: msg.playerId,
          playerName: msg.playerName,
          room: this.currentRoom,
        });

        // If host, check if both submitted to determine winner
        if (this.isHost && this.currentRoom.players.every((x) => x.submitted)) {
          this.currentRoom.state = 'result';
          const [p1, p2] = this.currentRoom.players;
          if (p2) {
            if (p1.score === p2.score) {
              this.currentRoom.isTie = true;
              this.currentRoom.winnerPlayerId = null;
            } else if ((p1.score ?? 0) > (p2.score ?? 0)) {
              this.currentRoom.winnerPlayerId = p1.playerId;
            } else {
              this.currentRoom.winnerPlayerId = p2.playerId;
            }
          }
          this.emitLocal('round_results', this.currentRoom);
          this.sendP2P({
            type: 'round_results',
            room: this.currentRoom,
          });
        }
      }
    } else if (msg.type === 'round_results') {
      this.currentRoom = msg.room;
      this.emitLocal('round_results', msg.room);
    } else if (msg.type === 'reaction') {
      this.emitLocal('reaction_received', msg.reaction);
    }
  }

  // ================= Connect & Create / Join =================
  public connect(): Socket | null {
    const isVercel = window.location.hostname.includes('vercel.app');
    if (isVercel) {
      // Vercel is a static host -> use P2P WebRTC engine
      this.mode = 'p2p';
      return null;
    }

    if (!this.socket) {
      const serverUrl = window.location.port === '5173'
        ? `http://${window.location.hostname}:3001`
        : window.location.origin;

      this.socket = io(serverUrl, {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
        reconnectionDelay: 500,
        timeout: 4000,
      });

      this.socket.on('connect', () => {
        console.log('⚡ Connected via Socket.IO:', this.socket?.id);
        this.mode = 'socket';
      });

      this.socket.on('connect_error', () => {
        // Fallback to P2P if socket server not found
        this.mode = 'p2p';
      });
    }

    return this.socket;
  }

  public async createRoom(playerName: string, avatar: string): Promise<{ room: RoomData; isHost: boolean }> {
    const isVercel = window.location.hostname.includes('vercel.app');
    const code = this.generateCode();

    if (isVercel) {
      return this.initP2PHost(code, playerName, avatar);
    }

    // Try Socket.IO first
    const s = this.connect();
    if (!s) {
      return this.initP2PHost(code, playerName, avatar);
    }

    return new Promise((resolve) => {
      let resolved = false;

      const fallbackTimer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          console.log('Socket timed out -> Falling back to P2P WebRTC room');
          resolve(this.initP2PHost(code, playerName, avatar));
        }
      }, 2500);

      const doEmit = () => {
        s.emit('create_room', {
          playerName,
          avatar,
          playerId: this.myPlayerId,
        });
      };

      s.once('room_created', (data: { room: RoomData; playerId: string; isHost: boolean }) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(fallbackTimer);
          this.currentRoom = data.room;
          this.isHost = data.isHost;
          this.mode = 'socket';
          resolve(data);
        }
      });

      if (s.connected) {
        doEmit();
      } else {
        s.once('connect', doEmit);
      }
    });
  }

  public async joinRoom(roomCode: string, playerName: string, avatar: string): Promise<{ room: RoomData; isHost: boolean }> {
    const isVercel = window.location.hostname.includes('vercel.app');
    const code = roomCode.trim().toUpperCase();

    if (isVercel) {
      return this.initP2PGuest(code, playerName, avatar);
    }

    const s = this.connect();
    if (!s) {
      return this.initP2PGuest(code, playerName, avatar);
    }

    return new Promise((resolve, reject) => {
      let resolved = false;

      const fallbackTimer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          // Fallback to P2P guest
          this.initP2PGuest(code, playerName, avatar).then(resolve).catch(reject);
        }
      }, 2500);

      const doEmit = () => {
        s.emit('join_room', {
          roomCode: code,
          playerName,
          avatar,
          playerId: this.myPlayerId,
        });
      };

      s.once('room_joined', (data: { room: RoomData; playerId: string; isHost: boolean }) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(fallbackTimer);
          this.currentRoom = data.room;
          this.isHost = data.isHost;
          this.mode = 'socket';
          resolve(data);
        }
      });

      s.once('error_message', (err: { message: string }) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(fallbackTimer);
          reject(new Error(err.message));
        }
      });

      if (s.connected) {
        doEmit();
      } else {
        s.once('connect', doEmit);
      }
    });
  }

  public setLevel(level: 'easy' | 'medium' | 'hard', timerDuration?: number) {
    if (this.mode === 'socket' && this.socket?.connected) {
      this.socket.emit('set_level', { level, timerDuration });
    } else if (this.currentRoom) {
      this.currentRoom.level = level;
      this.currentRoom.timerDuration = timerDuration ?? (level === 'easy' ? 120 : level === 'medium' ? 90 : 60);
      this.emitLocal('room_updated', this.currentRoom);
      this.sendP2P({ type: 'room_sync', room: this.currentRoom });
    }
  }

  public startImageSelection() {
    if (this.mode === 'socket' && this.socket?.connected) {
      this.socket.emit('start_image_selection');
    } else if (this.currentRoom) {
      this.currentRoom.state = 'selecting';
      this.currentRoom.selectedImageId = null;
      this.emitLocal('room_updated', this.currentRoom);
      this.sendP2P({ type: 'room_sync', room: this.currentRoom });
    }
  }

  public selectImage(imageId: string) {
    if (this.mode === 'socket' && this.socket?.connected) {
      this.socket.emit('select_image', { imageId });
    } else if (this.currentRoom) {
      this.currentRoom.selectedImageId = imageId;
      this.currentRoom.state = 'drawing';
      this.currentRoom.drawingStartTime = Date.now();
      const payload = {
        room: this.currentRoom,
        selectedImageId: imageId,
        timerDuration: this.currentRoom.timerDuration,
        startTime: this.currentRoom.drawingStartTime,
      };
      this.emitLocal('round_started', payload);
      this.sendP2P({ type: 'round_started', ...payload });
    }
  }

  public submitDrawing(drawingDataUrl: string, strokes: any[], score: number, breakdown: any) {
    if (this.mode === 'socket' && this.socket?.connected) {
      this.socket.emit('submit_drawing', { drawingDataUrl, strokes, score, breakdown });
    } else if (this.currentRoom) {
      const myP = this.currentRoom.players.find((p) => p.playerId === this.myPlayerId);
      if (myP) {
        myP.submitted = true;
        myP.drawingDataUrl = drawingDataUrl;
        myP.strokes = strokes;
        myP.score = score;
        myP.breakdown = breakdown;
      }

      this.emitLocal('player_submitted', {
        playerId: this.myPlayerId,
        playerName: myP?.name || 'Player',
        room: this.currentRoom,
      });

      this.sendP2P({
        type: 'player_submitted',
        playerId: this.myPlayerId,
        playerName: myP?.name || 'Player',
        drawingDataUrl,
        strokes,
        score,
        breakdown,
      });

      if (this.isHost && this.currentRoom.players.every((p) => p.submitted)) {
        this.currentRoom.state = 'result';
        const [p1, p2] = this.currentRoom.players;
        if (p2) {
          if (p1.score === p2.score) {
            this.currentRoom.isTie = true;
            this.currentRoom.winnerPlayerId = null;
          } else if ((p1.score ?? 0) > (p2.score ?? 0)) {
            this.currentRoom.winnerPlayerId = p1.playerId;
          } else {
            this.currentRoom.winnerPlayerId = p2.playerId;
          }
        }
        this.emitLocal('round_results', this.currentRoom);
        this.sendP2P({ type: 'round_results', room: this.currentRoom });
      }
    }
  }

  public playAgain(action: 'same_level' | 'new_level' | 'lobby' = 'same_level') {
    if (this.mode === 'socket' && this.socket?.connected) {
      this.socket.emit('play_again', { action });
    } else if (this.currentRoom) {
      this.currentRoom.players.forEach((p) => {
        p.submitted = false;
        p.drawingDataUrl = null;
        p.strokes = [];
        p.score = null;
        p.breakdown = null;
      });
      this.currentRoom.winnerPlayerId = null;
      this.currentRoom.isTie = false;
      this.currentRoom.state = action === 'same_level' ? 'selecting' : 'lobby';
      this.emitLocal('room_updated', this.currentRoom);
      this.sendP2P({ type: 'room_sync', room: this.currentRoom });
    }
  }

  public sendReaction(emoji: string) {
    const rx: ReactionEvent = {
      senderId: this.myPlayerId,
      senderName: this.currentRoom?.players.find((p) => p.playerId === this.myPlayerId)?.name || 'Partner',
      emoji,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };

    if (this.mode === 'socket' && this.socket?.connected) {
      this.socket.emit('send_reaction', { emoji });
    } else {
      this.emitLocal('reaction_received', rx);
      this.sendP2P({ type: 'reaction', reaction: rx });
    }
  }

  public onRoomUpdated(callback: (room: RoomData) => void) {
    this.socket?.on('room_updated', callback);
    const unsubLocal = this.onLocal('room_updated', callback);
    return () => {
      this.socket?.off('room_updated', callback);
      unsubLocal();
    };
  }

  public onRoundStarted(callback: (data: { room: RoomData; selectedImageId: string; timerDuration: number; startTime: number }) => void) {
    this.socket?.on('round_started', callback);
    const unsubLocal = this.onLocal('round_started', callback);
    return () => {
      this.socket?.off('round_started', callback);
      unsubLocal();
    };
  }

  public onPlayerSubmitted(callback: (data: { playerId: string; playerName: string; room: RoomData }) => void) {
    this.socket?.on('player_submitted', callback);
    const unsubLocal = this.onLocal('player_submitted', callback);
    return () => {
      this.socket?.off('player_submitted', callback);
      unsubLocal();
    };
  }

  public onRoundResults(callback: (room: RoomData) => void) {
    this.socket?.on('round_results', callback);
    const unsubLocal = this.onLocal('round_results', callback);
    return () => {
      this.socket?.off('round_results', callback);
      unsubLocal();
    };
  }

  public onReaction(callback: (reaction: ReactionEvent) => void) {
    this.socket?.on('reaction_received', callback);
    const unsubLocal = this.onLocal('reaction_received', callback);
    return () => {
      this.socket?.off('reaction_received', callback);
      unsubLocal();
    };
  }
}

export const socketService = new HybridNetworkService();
