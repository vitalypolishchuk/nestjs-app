import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from "@nestjs/jwt";
import { ChatController } from './chat.controller';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Module({
  imports: [
    JwtModule.register({
        secret: process.env.JWT_SECRET, // Use a secure secret
        signOptions: { expiresIn: '1h' }, // Optional: Set token expiration
    }),
],
  controllers: [ChatController],
  providers: [
    ChatGateway, RabbitMQService
  ],
})
export class ChatModule {}
