import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateCollaborationDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  tutor?: User | null;
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  student?: User | null;

  @ApiProperty({ type: Date, example: 1 })
  @IsNotEmpty()
  startDate: Date;
  @ApiProperty({ type: Date, example: 1 })
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ type: String, example: 'hellword' })
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
