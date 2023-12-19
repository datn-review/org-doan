/* eslint-disable @typescript-eslint/require-await */
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { MessageService } from '../message/message.service';
import { Message } from '../message/entities/message.entity';
import { AuthService } from '../../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ChatBotService } from '../chat-bot/chat-bot.service';
const relations = [
  {
    field: 'owner',
    entity: 'user',
  },
  {
    field: 'user.photo',
    entity: 'file',
  },
];
export const IIFE = (cb: any) => {
  return cb();
};
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly messageService: MessageService,
    private authService: AuthService,
    private chatBotService: ChatBotService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    const payload = await this.authService.verifyToken(token);
    console.log(payload);

    if (!payload) {
      client.disconnect(true);
    } else {
      console.log(`Client ${client.id} connected. Auth token: ${token}`);
    }
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, roomId: number) {
    console.log(`Client ${client.id} joined room: ${roomId}`);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    client.join(roomId.toString());
    return roomId;
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, roomId: number) {
    console.log(`Client ${client.id} leaved room: ${roomId}`);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    client.leave(roomId.toString());
    return roomId;
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, createMessageDto: any) {
    console.log(
      `Client ${client.id} sended message: ${createMessageDto.content} to room: ${createMessageDto.roomId}`,
    );
    if (createMessageDto?.isBot) {
      IIFE(async () => {
        const data = await this.chatBotService.handleUserRequest({
          userInput: createMessageDto.content,
          userId: createMessageDto.owner,
        });
        const message = (await this.messageService.create({
          ...createMessageDto,
          content: data,
          owner: 0,
        })) as unknown as Message;
        const newMessage = await this.messageService.findOne({ id: +message?.id }, relations);
        client.emit('message', newMessage);
        client.to(message.room.toString()).emit('message', newMessage);
      });
    }
    IIFE(async () => {
      const message = (await this.messageService.create(createMessageDto)) as unknown as Message;
      const newMessage = await this.messageService.findOne({ id: +message?.id }, relations);
      client.emit('message', newMessage);
      client.to(message.room.toString()).emit('message', newMessage);
    });
  }

  @SubscribeMessage('isTyping')
  async handleTypingNotification(client: Socket, roomId: any) {
    console.log(`Client ${client.id} typing message to room: ${roomId}`);
    client.to(roomId.toString()).emit('isTyping', `${client.id} typing message...`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }
}
