import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { CreatePostsDto } from './create.dto';

export class UpdatePostsDto extends PartialType(CreatePostsDto) {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '1' })
  title_VI: string;
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '1' })
  title_EN: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  user: User;

  @ApiProperty({ type: 'string', example: '1' })
  content_VI: string;
  @ApiProperty({ type: 'string', example: '1' })
  content_EN: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  type: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
