import { Injectable } from '@nestjs/common';
import { NewMessagePayload } from './interfaces/payload.interfaces';
import { prisma } from 'prisma/prisma';
import { Message } from './interfaces/message.interfaces';

@Injectable()
export class ChatService {
  constructor() {}

  async storeNewMessage(payload: NewMessagePayload) {
    await prisma.messages.create({ data: payload });
  }

  flatArray(array: Message[][]) {
    if (!array.some((elem) => Array.isArray(elem))) return array;

    const flattedArray = [];

    array.map((elem) => {
      console.log(elem);

      if (Array.isArray(elem)) {
        elem.map((el) => flattedArray.push(el));
      }

      flattedArray.push(elem);
    });

    return flattedArray;
  }

  sortMessagesByTimestamp(messages: Message[]) {
    return messages;
  }

  async getAllMessagesFromSenders(senders: number[]) {
    const messagesPromises = senders.map(async (senderId) => {
      return await prisma.messages.findMany({ where: { senderId } });
    });

    const rawMessages: Message[][] = await Promise.all(messagesPromises);
    const handledMessages = this.sortMessagesByTimestamp(
      this.flatArray(rawMessages),
    );

    return handledMessages;
  }
}
