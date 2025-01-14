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
  async handleNewMessage(client: Socket, data: NewMessagePayload) {
    console.log('------------');
    console.log('New message from ' + client.id + ' received');

    await this.chatService.storeNewMessage(data);
    const messages = await this.chatService.getAllMessagesFromSenders(
      data.senderId,
      data.receiverId,
    );
    this.io.emit('updateMessages', messages);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    client: Socket,
    data: { senderId: number; receiverId: number },
  ) {
    console.log('------------');
    console.log(
      'getMessages request was getting from ' + client.id + ' received',
    );

    const messages = await this.chatService.getAllMessagesFromSenders(
      data.senderId,
      data.receiverId,
    );
    client.emit('updateMessages', messages);
  }
}
