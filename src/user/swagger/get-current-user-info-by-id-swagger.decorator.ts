import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetUserInfoByIdSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user info by ID' }),
    ApiResponse({ status: 200, description: 'User info returned successfully' }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
