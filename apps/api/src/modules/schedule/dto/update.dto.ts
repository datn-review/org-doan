import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateScheduleDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
