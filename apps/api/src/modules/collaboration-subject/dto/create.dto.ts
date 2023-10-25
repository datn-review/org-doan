import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCollaborationSubjectDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  tutorId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  subjectId: number;
}
