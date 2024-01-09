import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional } from 'class-validator';

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
  gradeLevel?: number | null;

  @ApiProperty({
    type: 'number',
  })
  @IsEmpty()
  subject?: number | null;

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

export class CrawlExerciseDto {
  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  link?: string | null;
}
