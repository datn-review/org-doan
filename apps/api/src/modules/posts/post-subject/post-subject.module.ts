import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { PostSubject } from './entities/post-subject.entity';
import { PostSubjectController } from './post-subject.controller';
import { PostSubjectService } from './post-subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostSubject])],
  controllers: [PostSubjectController],
  providers: [IsExist, IsNotExist, PostSubjectService],
  exports: [PostSubjectService],
})
export class PostSubjectModule {}
