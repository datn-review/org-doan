import { io, Socket } from 'socket.io-client';

import { ClientToServerEvents, ServerToClientEvents } from './models/event';

import { AddMessageDto } from './models/message';
const URL_WS =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_APP_API_WS_PROD
    : import.meta.env.VITE_APP_API_WS_DEV;
class SocketService {
  private readonly socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    `ws://${URL_WS}`,
    {
      autoConnect: false,
    },
  );

  connectWithAuthToken(token: string) {
    this.socket.auth = { token };
    this.socket.connect();
  }

  disconnect() {
    // this.socket.disconnect();
  }

  sendMessage(data: AddMessageDto) {
    this.socket.emit('message', data);
  }

  notifyTyping(roomId: number) {
    this.socket.emit('isTyping', roomId);
  }

  subscribeToMessages(messageHandler: ServerToClientEvents['message']) {
    this.socket.on('message', messageHandler);
  }
  subscribeToLoading(messageHandler: ServerToClientEvents['isBotLoading']) {
    this.socket.on('isBotLoading', messageHandler);
  }

  subscribeToTypingNotifications(typingNotificationsHandler: ServerToClientEvents['isTyping']) {
    this.socket.on('isTyping', typingNotificationsHandler);
  }

  joinRoom(roomId: number) {
    this.socket.emit('join', roomId);
  }

  leaveRoom(roomId: number) {
    this.socket.emit('leave', roomId);
  }
}

export const socketService = new SocketService();
