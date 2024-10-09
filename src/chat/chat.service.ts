import { Injectable } from '@nestjs/common';
import { NewMessagePayload } from './interfaces/payload.interfaces';
import { Message } from './interfaces/message.interfaces';
import { prisma } from 'prisma/prisma';

@Injectable()
export class ChatService {
  constructor() {}

  async storeNewMessage(payload: NewMessagePayload) {
    await prisma.messages.create({ data: payload });
  }

  sortMessagesByTimestamp(messages: Message[]) {
    return messages.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    );
  }

  async getAllMessagesFromSenders(senderId: number, receiverId: number) {
    const messages1 = await prisma.messages.findMany({
      where: { senderId: senderId, receiverId: receiverId },
    });

    const messages2 = await prisma.messages.findMany({
      where: { senderId: receiverId, receiverId: senderId },
    });

    return this.sortMessagesByTimestamp([...messages1, ...messages2]);
  }
}
