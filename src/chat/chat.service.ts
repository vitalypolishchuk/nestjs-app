import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserSocketModel } from 'src/models/user-socket.model';
import { Message, MessageModel } from 'src/models/message.model';
import { Socket } from 'socket.io';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/types';
import { Cache } from 'cache-manager';

@Injectable()
export class ChatService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ){}

    async handleConnection(client: Socket, token: string) {
        if (!token) {
            throw new UnauthorizedException('Token missing');
        }

        // Verify the token and cast it to JwtPayload
        const decoded = this.jwtService.verify(token) as JwtPayload;
        client.data.user = decoded;

        // Write user data to cache manager (e.g., Redis or in-memory)
        await this.cacheManager.set(decoded.id, client.id);

        // Write user socket info to the database
        await UserSocketModel.findOneAndUpdate(
            { userId: decoded.id },
            { socketId: client.id },
            { upsert: true } // Insert new if not found
        );

        console.log(`User connected: ${decoded.id}, Socket ID: ${client.id}`);
    }

    async saveMessage(senderId: string, payload: { to: string; message: string }) {
        const newMessage = new MessageModel({
            sender: senderId,
            recipient: payload.to,
            message: payload.message,
            timestamp: new Date(),
        });

        await newMessage.save();
    }

    async getRecipientSocketId(payload: { to: string }) {
        // Get recipient socket ID from cache
        let recipientSocketId = await this.cacheManager.get<string>(payload.to);

        // If not in cache, fetch from the database
        if (!recipientSocketId) {
            const recipient = await UserSocketModel.findOne({ userId: payload.to });
            if (recipient && recipient.socketId) {
                recipientSocketId = recipient.socketId;
            } else {
                throw new Error(`Recipient ${payload.to} not found`);
            }
        }
        return recipientSocketId;
    }

    async getChatHistory(userId: string): Promise<Message[]> {
        // Fetch chat history for the given userId
        return MessageModel.find({ 
            $or: [
                { sender: userId },
                { recipient: userId }
            ]
        }).sort({ timestamp: 1 }).exec(); // Sort by timestamp
    }
}