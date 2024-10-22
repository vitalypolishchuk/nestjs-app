import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { ChatService } from "./chat.service";
import { AuthenticatedRequest } from "src/common/types";
import { ApiTags } from '@nestjs/swagger';
import { GetChatHistorySwagger } from "./swagger/get-chat-history-swagger.decorator";

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @GetChatHistorySwagger()
    @UseGuards(AuthGuard)
    @Get('history')
    async getChatHistory(@Req() request: AuthenticatedRequest) {
      const userId = request.user.id;
      return this.chatService.getChatHistory(userId); // Logic for fetching chat history
    }
}