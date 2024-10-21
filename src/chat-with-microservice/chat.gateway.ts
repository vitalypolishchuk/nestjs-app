import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtPayload } from 'src/common/types';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@WebSocketGateway({ path: '/chat/microservice/socket' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly rabbitMqService: RabbitMQService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {

    try {
      const token = client.handshake.auth.token; // Access the token
      console.log('Token:', token); // Log the token to see if it's defined
  
      const result = await this.rabbitMqService.sendNotification('handleConnection', { clientId: client.id, token });
      const decoded = this.jwtService.verify(token) as JwtPayload;
      client.data.user = decoded;
  
      console.log({ result });
    } catch (error) {
      console.error('Unauthorized client connection:', error);
      await this.handleDisconnect(client); // Call handleDisconnect for cleanup
    }
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    client.disconnect(); // Clean disconnection
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: { to: string, message: string }) {
    const sender = client.data.user;

    const recipientSocketId = await this.rabbitMqService.sendNotification('getRecipientSocketId', { to: payload.to });

    await this.rabbitMqService.sendNotification('saveMessage', { senderId: sender.id, payload: { to: payload.to,message: payload.message}})

    // Emit the response back to the client
    this.server.to(recipientSocketId).emit('message', {
      from: sender.id,
      message: payload.message,
    });
  }
}