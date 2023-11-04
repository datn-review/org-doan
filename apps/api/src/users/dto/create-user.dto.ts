import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import { IsEmail, IsNotEmpty, IsOptional, MinLength, Validate } from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({ type: 'string', example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ type: 'string', example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ type: 'string', example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  // @Validate(IsExist, ['FileEntity', 'id'], {
  //   message: 'imageNotExists',
  // })
  photo?: null | Express.Multer.File;

  // @ApiProperty({ type: Role })
  // @Validate(IsExist, ['Role', 'id'], {
  //   message: 'roleNotExists',
  // })
  role?: Role | null | any;
  @ApiProperty({ type: 'string' })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  hash?: string | null;

  @IsOptional()
  @ApiProperty({ type: Array, example: [1] })
  gradeLevel?: string;

  @IsOptional()
  @ApiProperty({ type: Array, example: [1] })
  skills?: string;

  @IsOptional()
  @ApiProperty({ type: Array, example: [1] })
  certification?: string;
  @IsOptional()
  @ApiProperty({ type: Array, example: [1] })
  tutorGradeSubject?: string;

  @IsOptional()
  @ApiProperty({ type: Array, example: [1] })
  timeAvailability?: string;
}
