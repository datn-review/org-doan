import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSubmissionQuestionDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateSubmissionQuestionDto extends PartialType(CreateSubmissionQuestionDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
