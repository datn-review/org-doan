import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTutorSubjectGradeDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  studentId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  subjectId: number;
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  gradeId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
