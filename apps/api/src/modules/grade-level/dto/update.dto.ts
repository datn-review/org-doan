import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateDto extends PartialType(CreateDto) {
  @IsOptional()
  nameVI: string;

  @ApiProperty({ type: 'string', example: '1' })
  @IsOptional()
  nameEN: string;

  @ApiProperty({ type: 'string', example: '1' })
  @IsOptional()
  descriptionVI: string;

  @ApiProperty({ type: 'string', example: '1' })
  @IsOptional()
  descriptionEN: string;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
