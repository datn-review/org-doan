import { Body, Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class MessageRepository {}
@Injectable()
export class MessageService extends BaseService<Message, Repository<Message>, IParams> {
  constructor(@InjectRepository(Message) repository: Repository<Message>) {
    super(repository);
  }
  getMessages(getMessagesDto: any) {
    return this.repository.findBy({
      room: { id: getMessagesDto?.roomId },
    });
  }
}
