import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddProductDto } from '../dto/add-product.dto';

export function CreateProductSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new product' }),
    ApiBody({ type: AddProductDto }),
    ApiResponse({ status: 201, description: 'Product created successfully' }),
    ApiResponse({ status: 403, description: 'Forbidden, Admin privileges required' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}


