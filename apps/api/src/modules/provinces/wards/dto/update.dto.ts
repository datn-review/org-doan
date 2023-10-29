import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWardsDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateWardsDto extends PartialType(CreateWardsDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
