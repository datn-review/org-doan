import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { PostComment } from './entities/post-comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class PostCommentRepository {}
@Injectable()
export class PostCommentService extends BaseService<PostComment, Repository<PostComment>, IParams> {
  constructor(@InjectRepository(PostComment) repository: Repository<PostComment>) {
    super(repository);
  }
}
