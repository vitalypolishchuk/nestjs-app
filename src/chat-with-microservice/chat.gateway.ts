import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtPayload } from 'src/common/types';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { HandleConnectionSwagger } from './swagger/handle-connection-swagger.decorator';
import { HandleDisconnectSwagger } from './swagger/handle-disconnect-swagger.decorator';
import { SaveMessageSwagger } from './swagger/save-message-swagger.decorator';

@WebSocketGateway({ path: '/chat/microservice/socket' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly rabbitMqService: RabbitMQService,
    private readonly jwtService: JwtService,
  ) {}

  @HandleConnectionSwagger()
  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token; // Access the token
      if (!token) {
        throw new WsException('Token is not included');
      }
  
      const result = await this.rabbitMqService.sendNotification('handleConnection', {
        clientId: client.id,
        token,
      });
  
      // Check the result from RabbitMQ
      if (!('status' in result) || result.status !== 'successful') {
        throw new WsException('Notification failed: ' + (result.message || 'Unknown error'));
      }
  
      // Verify the token
      const decoded = this.jwtService.verify(token) as JwtPayload;
      client.data.user = decoded; // Save user data on the client
    } catch (error) {
      console.error('Unauthorized client connection:', error.message || error);
      await this.handleDisconnect(client); // Call handleDisconnect for cleanup
    }
  }

  @HandleDisconnectSwagger()
  async handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    client.disconnect(); // Clean disconnection
  }

  @SaveMessageSwagger()
  @SubscribeMessage('message')
  async saveMessage(client: Socket, payload: { to: string, message: string }) {
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