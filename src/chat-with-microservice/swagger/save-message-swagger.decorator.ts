import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SaveMessageDto } from "../dto/message.dto";

export function SaveMessageSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Save and send a message to the recipient' }),
    ApiBody({ type: SaveMessageDto }), // Specify the body structure
    ApiResponse({ status: 200, description: 'Message saved and sent successfully' }),
    ApiResponse({ status: 404, description: 'Recipient not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}