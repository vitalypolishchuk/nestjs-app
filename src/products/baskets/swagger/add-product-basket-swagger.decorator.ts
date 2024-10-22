import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function AddProductToBasketSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Add a product to the user\'s basket by product ID' }),
    ApiResponse({ status: 201, description: 'Product added to basket successfully' }),
    ApiResponse({ status: 404, description: 'Product not found' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
