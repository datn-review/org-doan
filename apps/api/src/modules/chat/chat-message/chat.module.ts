import { Module, forwardRef } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { MessageModule } from '../message/message.module';
import { AuthModule } from 'src/auth/auth.module';
import { ChatBotModule } from '../chat-bot/chat-bot.module';

@Module({
  imports: [MessageModule, AuthModule, ChatBotModule],
  providers: [ChatGateway],
})
export class ChatModule {}
