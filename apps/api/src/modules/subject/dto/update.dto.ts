import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSubjectDto } from './create.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
  @ApiProperty({ example: '1' })
  @ApiProperty({ type: 'string', example: '1' })
  @IsNotEmpty()
  nameVI: string;

  @ApiProperty({ type: 'string', example: '1' })
  @IsNotEmpty()
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
