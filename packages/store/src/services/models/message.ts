export interface IMessage {
  id: number;
  owner: any;
  roomId: number;
  content: string;
}

export interface AddMessageDto {
  content: string;
  roomId: number;
}
