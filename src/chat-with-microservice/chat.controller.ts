import { Controller } from "@nestjs/common";
// import { AuthGuard } from "src/guards/auth.guard";
// import { AuthenticatedRequest } from "src/common/types";

@Controller('microservice/chat')
export class ChatController {
  // @UseGuards(AuthGuard) // Ensure the guard is properly imported and used
  // @Get('history')
  // async getChatHistory(@Req() request: AuthenticatedRequest) {
  //   const userId = request.user.id;

  //   // Sending the request to the microservice to get chat history
  //   const chatHistory = await this.chatClient.send({ cmd: 'get_chat_history' }, { userId }).toPromise();

  //   // Return the chat history response from the microservice
  //   return chatHistory;
  // }

  // @Get('send-test')
  // async sendTestMessage() {
  //   try {
  //     console.log("HERE");
  //     const response = await this.chatClient.send({ cmd: 'test_message' }, { content: 'Hello from ChatController!' }).toPromise();
  //     console.log({ response });
  //     return response;
  //   } catch (error) {
  //     console.error('Error sending test message:', error);
  //     throw new HttpException('Error sending message', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}