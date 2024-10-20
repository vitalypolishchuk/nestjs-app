

import { Server } from 'socket.io';
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service'; // Adjust the path as necessary

@WebSocketGateway({ path: '/chat/socket' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(private readonly chatService: ChatService) {}

    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth.token; // Access the token
            await this.chatService.handleConnection(client, token);
        } catch (error) {
            console.error('Unauthorized client connection:', error.message);
            await this.handleDisconnect(client); // Call handleDisconnect for cleanup
        }
    }

    async handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
        // Handle disconnection logic here if necessary
        client.disconnect(); // Clean disconnection
    }

    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: { to: string, message: string }) {
        const sender = client.data.user;
        try {
            const recipientSocketId = await this.chatService.getRecipientSocketId(payload);
            await this.chatService.saveMessage(sender.id, payload);

            // Emit the message to the recipient
            this.server.to(recipientSocketId).emit('message', {
                from: sender.id,
                message: payload.message,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}
