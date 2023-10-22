import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNotificationsDto {
  @ApiProperty({ type: 'string', example: '1' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  text_EN: string;

  @IsNotEmpty()
  text_VI: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
