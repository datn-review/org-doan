import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Posts } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class PostsRepository {}
@Injectable()
export class PostsService extends BaseService<Posts, Repository<Posts>, IParams> {
  constructor(@InjectRepository(Posts) repository: Repository<Posts>) {
    super(repository);
  }
}
