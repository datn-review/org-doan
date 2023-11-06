import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTutorTimeAvailabilityDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateTutorTimeAvailabilityDto extends PartialType(CreateTutorTimeAvailabilityDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
