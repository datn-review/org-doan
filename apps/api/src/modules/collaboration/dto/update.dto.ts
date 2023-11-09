import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Posts } from 'src/modules/posts/entities/posts.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateCollaborationDto } from './create.dto';

export class UpdateCollaborationDto extends PartialType(CreateCollaborationDto) {
  @ApiProperty({ type: Number, example: 1 })
  @IsOptional()
  tutor?: User | null;
  @ApiProperty({ type: Number, example: 1 })
  @IsOptional()
  student?: User | null;

  @ApiProperty({ type: Number, example: 1 })
  @IsOptional()
  posts?: Posts | null;

  @ApiProperty({ type: String, example: 1 })
  studentSignature?: string | null;

  @ApiProperty({ type: String, example: 1 })
  tutorSignature?: string | null;

  @ApiProperty({ type: Date, example: 1 })
  @IsOptional()
  startDate: Date;
  @ApiProperty({ type: Date, example: 1 })
  @IsOptional()
  endDate: Date;

  @ApiProperty({ type: String, example: 'hellword' })
  @IsOptional()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
