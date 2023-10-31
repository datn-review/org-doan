import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Wards } from 'src/modules/provinces/wards/entities/wards.entity';
import { User } from 'src/users/entities/user.entity';

export class CreatePostsDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '1' })
  requestSummaryVI: string;

  @IsOptional()
  @ApiProperty({ type: 'string', example: '1' })
  requestSummaryEN?: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  user: User;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '1' })
  requestDetailVI: string;

  @IsOptional()
  @ApiProperty({ type: 'string', example: '1' })
  requestDetailEN?: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '1' })
  address: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '1' })
  wards: Wards | number;

  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  timeDay: number;
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  fee: number;

  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  perTime: number;

  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  dayWeek: number;

  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  timeStart: Date | string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  type: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
  @IsNotEmpty()
  @ApiProperty({ type: Array, example: [1] })
  certification: number[];

  @ApiProperty({ type: Array, example: [1] })
  gradeLevel: number[];

  @ApiProperty({ type: Array, example: [1] })
  skills: number[];
  @ApiProperty({ type: Array, example: [1] })
  subject: number[];

  @ApiProperty({ type: Array, example: [1] })
  timeAvailability: string[];
}
