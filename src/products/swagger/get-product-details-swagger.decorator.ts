import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetProductDetailsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get product details by ID' }),
    ApiResponse({ status: 200, description: 'Product details returned successfully' }),
    ApiResponse({ status: 404, description: 'Product not found' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
