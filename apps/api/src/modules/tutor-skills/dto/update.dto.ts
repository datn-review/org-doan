import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTutorSkillsDto } from './create.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Skills } from 'src/modules/skills/entities/skills.entity';

export class UpdateTutorSkillsDto extends PartialType(CreateTutorSkillsDto) {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  tutor?: User | null;

  @ApiProperty({ type: String, example: 1 })
  @IsOptional()
  skills?: Skills | null;

  @ApiProperty({ type: String, example: 'hellword' })
  @IsOptional()
  customerName_VN: string;

  @ApiProperty({ type: String, example: 'hellword' })
  @IsOptional()
  customernameEN: string;

  @ApiProperty({ type: String, example: 'hellword' })
  @IsOptional()
  customerDes_VI: string;

  @IsOptional()
  @ApiProperty({ type: String, example: 'hellword' })
  customerDes_EN: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
