import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { ChatService } from "./chat.service";

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @UseGuards(AuthGuard)
    @Get('history')
    async getChatHistory(@Req() request: any) {
        const userId = request.user.id;
        return this.chatService.getChatHistory(userId); // Logic for fetching chat history
    }
}