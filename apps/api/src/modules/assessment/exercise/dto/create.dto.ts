import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsEmpty()
  file?: null | Express.Multer.File;

  @ApiProperty({
    type: 'number',
  })
  @IsEmpty()
  gradeLevelId?: number | null;

  @ApiProperty({
    type: 'number',
  })
  @IsEmpty()
  subjectId?: number | null;

  @ApiProperty({
    type: 'string',
  })
  @IsEmpty()
  name?: string | null;

  @ApiProperty({
    type: 'boolean',
  })
  @IsEmpty()
  isPublish?: boolean | null;
}
