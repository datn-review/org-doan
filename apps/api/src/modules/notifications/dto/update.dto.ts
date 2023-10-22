import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificationsDto } from './create.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateNotificationsDto extends PartialType(CreateNotificationsDto) {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  text_EN: string;

  @IsNotEmpty()
  text_VI: string;

  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
