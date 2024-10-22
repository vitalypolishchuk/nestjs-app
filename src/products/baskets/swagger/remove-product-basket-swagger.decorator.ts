import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function RemoveProductFromBasketSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove a product from the user\'s basket by product ID' }),
    ApiResponse({ status: 200, description: 'Product removed from basket successfully' }),
    ApiResponse({ status: 404, description: 'Product not found in basket' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
