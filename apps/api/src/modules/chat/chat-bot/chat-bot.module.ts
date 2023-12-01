import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { ChatBot } from './entities/chat-bot.entity';
import { ChatBotController } from './chat-bot.controller';
import { ChatBotService } from './chat-bot.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatBot])],
  controllers: [ChatBotController],
  providers: [IsExist, IsNotExist, ChatBotService],
  exports: [ChatBotService],
})
export class ChatBotModule {}
