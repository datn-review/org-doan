import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from 'src/modules/lessons/lessons.module';
import { UsersModule } from 'src/users/users.module';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { ChatBotController } from './chat-bot.controller';
import { ChatBotService } from './chat-bot.service';
import { ChatBot } from './entities/chat-bot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatBot]), UsersModule, LessonsModule],
  controllers: [ChatBotController],
  providers: [IsExist, IsNotExist, ChatBotService],
  exports: [ChatBotService],
})
export class ChatBotModule {}
