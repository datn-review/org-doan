import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { CreateTimeAvailabilityDto } from './create.dto';

export class UpdateTimeAvailabilityDto extends PartialType(CreateTimeAvailabilityDto) {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  user?: User | null;

  @ApiProperty({ type: Number, example: 2 })
  dayofWeek: number;

  @ApiProperty({ type: Number, example: 2 })
  startTime: number;

  @ApiProperty({ type: Number, example: 2 })
  endTime: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
