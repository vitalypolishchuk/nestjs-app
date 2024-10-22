import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetCurrentUserInfoSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get current user info' }),
    ApiResponse({ status: 200, description: 'Current user info returned successfully' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
