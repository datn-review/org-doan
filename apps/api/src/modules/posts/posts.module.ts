import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Posts } from './entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostTimeAvailabilityModule } from './post-time-availability/post-time-availability.module';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), PostTimeAvailabilityModule],
  controllers: [PostsController],
  providers: [IsExist, IsNotExist, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
