import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateCollaborationSubjectDto } from './create.dto';

export class UpdateCollaborationSubjectDto extends PartialType(CreateCollaborationSubjectDto) {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  tutorId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  subjectId: number;
}
