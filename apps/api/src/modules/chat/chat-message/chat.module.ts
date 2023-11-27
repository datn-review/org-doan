import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { MessageModule } from '../message/message.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MessageModule, AuthModule],
  providers: [ChatGateway],
})
export class ChatModule {}
