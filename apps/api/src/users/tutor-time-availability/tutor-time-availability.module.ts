import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TutorTimeAvailability } from './entities/tutor-time-availability.entity';
import { TutorTimeAvailabilityController } from './tutor-time-availability.controller';
import { TutorTimeAvailabilityService } from './tutor-time-availability.service';

@Module({
  imports: [TypeOrmModule.forFeature([TutorTimeAvailability])],
  controllers: [TutorTimeAvailabilityController],
  providers: [IsExist, IsNotExist, TutorTimeAvailabilityService],
  exports: [TutorTimeAvailabilityService],
})
export class TutorTimeAvailabilityModule {}
