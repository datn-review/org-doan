import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateDto extends PartialType(CreateDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
