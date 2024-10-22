import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function HandleConnectionSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Handle WebSocket connection and authenticate the client' }),
    ApiResponse({ status: 200, description: 'Client connected successfully' }),
    ApiResponse({ status: 401, description: 'Unauthorized, token is missing or invalid' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
