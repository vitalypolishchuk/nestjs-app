import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthenticatedRequest } from "src/common/types";
import { RabbitMQService } from "src/rabbitmq/rabbitmq.service";
import { GetChatHistorySwagger } from "./swagger/get-chat-history-swagger.decorator";

@Controller('microservice/chat')
export class ChatController {
  constructor(private readonly rabbitMqService: RabbitMQService){}

  @UseGuards(AuthGuard)
  @GetChatHistorySwagger()
  @Get('history')
  async getChatHistory(@Req() request: AuthenticatedRequest) {
    const userId = request.user.id;

    // Sending the request to the microservice to get chat history
    const chatHistory = await this.rabbitMqService.sendNotification('getChatHistory', {
      userId
    });
    return chatHistory;
  }
}