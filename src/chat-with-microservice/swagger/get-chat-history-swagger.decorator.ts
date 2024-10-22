import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetChatHistorySwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get chat history for the current user' }),
    ApiResponse({ status: 200, description: 'Chat history retrieved successfully' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
