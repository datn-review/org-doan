import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Skills } from 'src/modules/skills/entities/skills.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateTutorSkillsDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  tutor?: User | null;

  @IsOptional()
  @ApiProperty({ type: Number, example: 1 })
  skills?: Skills | null;

  @ApiProperty({ type: String, example: 'hellword' })
  @IsOptional()
  customerName_VN: string;
  @ApiProperty({ type: String, example: 'hellword' })
  @IsOptional()
  customerName_EN: string;
  @ApiProperty({ type: String, example: 'hellword' })
  @IsOptional()
  customerDes_VI: string;
  @IsOptional()
  @ApiProperty({ type: String, example: 'hellword' })
  customerDes_EN: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
