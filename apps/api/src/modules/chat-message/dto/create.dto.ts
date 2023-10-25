import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Conversation } from 'src/modules/conversation/entities/conversation.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateChatMessageDto {
  @ApiProperty({ type: Number, example: 1 })
  sender?: User | null;

  @ApiProperty({ type: Number, example: 1 })
  conversation?: Conversation | null;

  @ApiProperty({ type: Number, example: 1 })
  messageText: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
