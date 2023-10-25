import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificationsDto } from './create.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class UpdateNotificationsDto extends PartialType(CreateNotificationsDto) {
  @ApiProperty({ type: String, example: 'hello word' })
  @IsNotEmpty()
  text_EN: string;

  @ApiProperty({ type: String, example: 'hello word' })
  @IsNotEmpty()
  text_VI: string;

  @ApiProperty({ type: User, example: 1 })
  @IsNotEmpty()
  user: User | null;

  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
