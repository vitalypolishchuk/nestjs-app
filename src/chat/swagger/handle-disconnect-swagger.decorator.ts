import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

// Decorator for handling client disconnection
export function HandleDisconnectSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Handle client disconnection' }),
    ApiResponse({ status: 200, description: 'Client disconnected successfully' }),
  );
}