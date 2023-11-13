import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, MinLength, Validate } from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Role } from '../../roles/entities/role.entity';
import { Wards } from 'src/modules/provinces/wards/entities/wards.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  // @Validate(IsNotExist, ['User'], {
  //   message: 'emailAlreadyExists',
  // })
  @IsEmail()
  email?: string | null;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  lastName?: string | null;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  // @Validate(IsExist, ['FileEntity', 'id'], {
  //   message: 'imageNotExists',
  // })
  photo?: null | Express.Multer.File;

  @ApiProperty({ type: String })
  @IsOptional()
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null | any;

  @ApiProperty({ type: String })
  @IsOptional()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  hash?: string | null;

  @IsOptional()
  @ApiProperty({ type: Array, example: [1] })
  certification?: string;

  @IsOptional()
  @ApiProperty({ type: Array, example: [1] })
  tutorGradeSubject?: string;

  @IsOptional()
  @ApiProperty({ type: Array, example: [1] })
  skills?: string;

  @IsOptional()
  @ApiProperty({ type: Array, example: [1] })
  timeAvailability?: string;

  @IsOptional()
  @ApiProperty({ type: String, example: 'Duong 615 ' })
  address?: string | null;
  @IsOptional()
  @ApiProperty({ type: Number, example: 1 })
  wards?: Wards | null | number;
}
