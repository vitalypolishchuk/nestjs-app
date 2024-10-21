import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { ChatService } from "./chat.service";
import { AuthenticatedRequest } from "src/common/types";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MessageResponseDto } from "./dto/message.dto";

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @ApiBearerAuth() // Adds JWT Bearer auth support in Swagger
    @ApiOperation({ summary: 'Get chat history' }) // Describes the operation in Swagger
    @ApiResponse({
      status: 200,
      description: 'Chat history fetched successfully',
      type: [MessageResponseDto],
    })
    @ApiResponse({
      status: 401,
      description: 'Unauthorized',
    })
    @UseGuards(AuthGuard)
    @Get('history')
    async getChatHistory(@Req() request: AuthenticatedRequest) {
      const userId = request.user.id;
      return this.chatService.getChatHistory(userId); // Logic for fetching chat history
    }
}