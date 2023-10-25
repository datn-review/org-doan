import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStudentSubjectDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  studentId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  subjectId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
