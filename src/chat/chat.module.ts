import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ChatGateway } from "./chat.gateway";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Use a secure secret
            signOptions: { expiresIn: '1h' }, // Optional: Set token expiration
        }),
    ],
    controllers: [ChatController],
    providers: [ChatGateway, ChatService]
})

export class ChatModule {}
