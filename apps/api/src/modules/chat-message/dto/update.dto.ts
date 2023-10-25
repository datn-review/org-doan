import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Conversation } from 'src/modules/conversation/entities/conversation.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateChatMessageDto } from './create.dto';

export class UpdateChatMessageDto extends PartialType(CreateChatMessageDto) {
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  sender?: User | null;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  conversation?: Conversation | null;

  @ApiProperty({ type: Number, example: 1 })
  messageText: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
