import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateNotificationsDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'hello word' })
  text_EN: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'hello word' })
  text_VI: string;

  @IsNotEmpty()
  @ApiProperty({ type: User, example: 1 })
  user: User | null;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
