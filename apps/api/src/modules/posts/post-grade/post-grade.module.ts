import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { PostGrade } from './entities/post-grade.entity';
import { PostGradeController } from './post-grade.controller';
import { PostGradeService } from './post-grade.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostGrade])],
  controllers: [PostGradeController],
  providers: [IsExist, IsNotExist, PostGradeService],
  exports: [PostGradeService],
})
export class PostGradeModule {}
