import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostTimeAvailabilityDto {
  @ApiProperty({ type: 'string', example: '1' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
