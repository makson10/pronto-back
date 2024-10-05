export type Message = {
  messageId: number;
  senderId: number;
  receiverId: number;
  text: string;
  image: string | null;
  timestamp: Date;
  wasReaded: boolean;
};
