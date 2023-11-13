import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { PostTimeAvailability } from './entities/post-time-availability.entity';
import { PostTimeAvailabilityController } from './post-time-availability.controller';
import { PostTimeAvailabilityService } from './post-time-availability.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostTimeAvailability])],
  controllers: [PostTimeAvailabilityController],
  providers: [IsExist, IsNotExist, PostTimeAvailabilityService],
  exports: [PostTimeAvailabilityService],
})
export class PostTimeAvailabilityModule {}
