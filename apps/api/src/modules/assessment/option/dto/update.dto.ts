import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOptionDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateOptionDto extends PartialType(CreateOptionDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
