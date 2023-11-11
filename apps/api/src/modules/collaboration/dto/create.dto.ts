import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Posts } from 'src/modules/posts/entities/posts.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateCollaborationDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsOptional()
  user?: User | null;

  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  posts?: Posts | null;

  // @ApiProperty({ type: String, example: 1 })
  // @IsOptional()
  // studentSignature?: string | null;

  @ApiProperty({ type: String, example: 1 })
  @IsOptional()
  signature?: string | null;

  @ApiProperty({ type: Date, example: 1 })
  @IsOptional()
  contractStartDate: Date;

  @ApiProperty({ type: Date, example: 1 })
  @IsOptional()
  contractEndDate: Date;

  @ApiProperty({ type: String, example: 1 })
  @IsOptional()
  contractTerms: string | null;

  @ApiProperty({ type: String, example: 'hellword' })
  @IsOptional()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
