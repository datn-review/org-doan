import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateTimeAvailabilityDto {
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
