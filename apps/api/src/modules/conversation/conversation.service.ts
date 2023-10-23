import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ConversationRepository {}
@Injectable()
export class ConversationService extends BaseService<
  Conversation,
  Repository<Conversation>,
  IParams
> {
  constructor(@InjectRepository(Conversation) repository: Repository<Conversation>) {
    super(repository);
  }
}
