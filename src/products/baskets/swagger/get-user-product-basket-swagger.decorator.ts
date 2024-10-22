import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetUserBasketProductsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all products in the user\'s basket' }),
    ApiResponse({ status: 200, description: 'Products retrieved successfully from basket' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
