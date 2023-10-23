import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ChatMessageRepository {}
@Injectable()
export class ChatMessageService extends BaseService<ChatMessage, Repository<ChatMessage>, IParams> {
  constructor(@InjectRepository(ChatMessage) repository: Repository<ChatMessage>) {
    super(repository);
  }
}
