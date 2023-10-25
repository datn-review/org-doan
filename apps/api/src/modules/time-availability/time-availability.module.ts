import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TimeAvailability } from './entities/time-availability.entity';
import { TimeAvailabilityController } from './time-availability.controller';
import { TimeAvailabilityService } from './time-availability.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeAvailability])],
  controllers: [TimeAvailabilityController],
  providers: [IsExist, IsNotExist, TimeAvailabilityService],
  exports: [TimeAvailabilityService],
})
export class TimeAvailabilityModule {}
