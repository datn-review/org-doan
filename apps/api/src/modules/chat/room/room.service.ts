import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class RoomRepository {}
@Injectable()
export class RoomService extends BaseService<Room, Repository<Room>, IParams> {
  constructor(@InjectRepository(Room) repository: Repository<Room>) {
    super(repository);
  }
  findRoomByUser(userId: number) {
    return this.repository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.members', 'members')
      .leftJoinAndSelect('members.photo', 'file')
      .leftJoinAndSelect('members.role', 'role')
      .leftJoinAndSelect('owner.role', 'role_')
      .leftJoinAndSelect('owner.photo', 'file_')
      .leftJoinAndSelect('room.messages', 'message')
      .where('owner.id = :userId OR members.id = :userId', { userId })
      .getMany();
  }
}
