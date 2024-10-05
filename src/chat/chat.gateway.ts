import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { NewMessagePayload } from './interfaces/payload.interfaces';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() io: Server;

  afterInit() {
    console.log('socket init');
  }

  handleConnection(client: Socket) {
    const { sockets } = this.io.sockets;

    console.log('---------------------');
    console.log('client id ' + client.id);
    console.log('socket size ' + sockets.size);
  }

  handleDisconnect(client: Socket) {
    console.log('---------------------');
    console.log(client.id + ' disconnected');
  }

  @SubscribeMessage('newMessage')
  async handleMessage(client: Socket, data: NewMessagePayload) {
    console.log('---------------------');
    console.log('Message from ' + client.id + ' received');
    console.log('Payload - ' + JSON.stringify(data));

    // await this.chatService.storeNewMessage(data);
    const senders = [data.senderId, data.receiverId];
    const messages = await this.chatService.getAllMessagesFromSenders(senders);
    this.io.emit('updateMessages', messages);
  }
}
