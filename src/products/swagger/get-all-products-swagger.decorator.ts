import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetAllProductsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all products' }),
    ApiResponse({ status: 200, description: 'Products retrieved successfully' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
