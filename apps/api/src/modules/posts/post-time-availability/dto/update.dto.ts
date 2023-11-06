import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostTimeAvailabilityDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdatePostTimeAvailabilityDto extends PartialType(CreatePostTimeAvailabilityDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
