import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DeleteProductSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a product by ID' }),
    ApiResponse({ status: 200, description: 'Product deleted successfully' }),
    ApiResponse({ status: 404, description: 'Product not found' }),
    ApiResponse({ status: 403, description: 'Forbidden, Admin privileges required' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
