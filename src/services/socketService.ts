import { io, Socket } from 'socket.io-client';

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

class SocketService {
  private socket: Socket | null = null;
  private currentRoom: RoomData | null = null;
  private myPlayerId: string = '';
  private isHost: boolean = false;

  constructor() {
    // Generate or retrieve persistent playerId from sessionStorage
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

  public connect(): Socket {
    if (!this.socket) {
      // Connect to same origin (proxied via Vite /socket.io in dev) with direct fallback
      const serverUrl = window.location.port === '5173'
        ? `http://${window.location.hostname}:3001`
        : window.location.origin;

      this.socket = io(serverUrl, {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 10,
        reconnectionDelay: 500,
        timeout: 5000,
      });

      this.socket.on('connect', () => {
        console.log('⚡ Connected to Drawing Duel server:', this.socket?.id);
      });

      this.socket.on('connect_error', (err) => {
        console.warn('⚠️ Socket connection error:', err.message);
      });

      this.socket.on('disconnect', () => {
        console.log('❌ Disconnected from server');
      });
    }

    if (this.socket.disconnected) {
      this.socket.connect();
    }

    return this.socket;
  }

  public createRoom(playerName: string, avatar: string): Promise<{ room: RoomData; isHost: boolean }> {
    const s = this.connect();
    return new Promise((resolve, reject) => {
      let resolved = false;

      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          reject(new Error('Connection timed out. Please verify that the backend server is running.'));
        }
      }, 5000);

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
          clearTimeout(timeout);
          this.currentRoom = data.room;
          this.isHost = data.isHost;
          resolve(data);
        }
      });

      s.once('error_message', (err: { message: string }) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
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

  public joinRoom(roomCode: string, playerName: string, avatar: string): Promise<{ room: RoomData; isHost: boolean }> {
    const s = this.connect();
    return new Promise((resolve, reject) => {
      let resolved = false;

      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          reject(new Error('Connection timed out. Please verify that the backend server is running.'));
        }
      }, 5000);

      const doEmit = () => {
        s.emit('join_room', {
          roomCode,
          playerName,
          avatar,
          playerId: this.myPlayerId,
        });
      };

      s.once('room_joined', (data: { room: RoomData; playerId: string; isHost: boolean }) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          this.currentRoom = data.room;
          this.isHost = data.isHost;
          resolve(data);
        }
      });

      s.once('error_message', (err: { message: string }) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
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
    this.socket?.emit('set_level', { level, timerDuration });
  }

  public startImageSelection() {
    this.socket?.emit('start_image_selection');
  }

  public selectImage(imageId: string) {
    this.socket?.emit('select_image', { imageId });
  }

  public submitDrawing(drawingDataUrl: string, strokes: any[], score: number, breakdown: any) {
    this.socket?.emit('submit_drawing', {
      drawingDataUrl,
      strokes,
      score,
      breakdown,
    });
  }

  public playAgain(action: 'same_level' | 'new_level' | 'lobby' = 'same_level') {
    this.socket?.emit('play_again', { action });
  }

  public sendReaction(emoji: string) {
    this.socket?.emit('send_reaction', { emoji });
  }

  public onRoomUpdated(callback: (room: RoomData) => void) {
    this.socket?.on('room_updated', callback);
    return () => {
      this.socket?.off('room_updated', callback);
    };
  }

  public onRoundStarted(callback: (data: { room: RoomData; selectedImageId: string; timerDuration: number; startTime: number }) => void) {
    this.socket?.on('round_started', callback);
    return () => {
      this.socket?.off('round_started', callback);
    };
  }

  public onPlayerSubmitted(callback: (data: { playerId: string; playerName: string; room: RoomData }) => void) {
    this.socket?.on('player_submitted', callback);
    return () => {
      this.socket?.off('player_submitted', callback);
    };
  }

  public onRoundResults(callback: (room: RoomData) => void) {
    this.socket?.on('round_results', callback);
    return () => {
      this.socket?.off('round_results', callback);
    };
  }

  public onReaction(callback: (reaction: ReactionEvent) => void) {
    this.socket?.on('reaction_received', callback);
    return () => {
      this.socket?.off('reaction_received', callback);
    };
  }
}

export const socketService = new SocketService();
