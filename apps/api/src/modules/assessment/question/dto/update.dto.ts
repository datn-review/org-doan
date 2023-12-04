import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
