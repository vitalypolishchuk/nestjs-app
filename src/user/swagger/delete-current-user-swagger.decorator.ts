import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DeleteCurrentUserSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete current user' }),
    ApiResponse({ status: 200, description: 'User deleted successfully' }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
