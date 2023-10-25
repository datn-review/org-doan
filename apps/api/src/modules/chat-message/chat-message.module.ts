import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { ChatMessage } from './entities/chat-message.entity';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessageService } from './chat-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  controllers: [ChatMessageController],
  providers: [IsExist, IsNotExist, ChatMessageService],
  exports: [ChatMessageService],
})
export class ChatMessageModule {}
