import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGuard } from "src/guards/auth.guard";
import { AddProductDto } from "./dto/add-product.dto";
import { AdminGuard } from "src/guards/admin.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('products') // Group all product-related routes under the 'products' tag in Swagger
@ApiBearerAuth()  // Indicate that JWT auth is used for protected routes in this controller
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(AuthGuard, AdminGuard)
    @Post('/')
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden, Admin privileges required' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async createProduct(@Body() addProductDto: AddProductDto, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.createProduct(userId, addProductDto);
    }

    @Get('/')
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async getAllProducts() {
        return await this.productService.getAllProducts();
    }

    @UseGuards(AuthGuard)
    @Get('details/:id')
    @ApiOperation({ summary: 'Get product details by ID' })
    @ApiResponse({ status: 200, description: 'Product details returned successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getProduct(@Param('id') productId: string, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.getProduct(userId, productId);
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Delete('details/:id')
    @ApiOperation({ summary: 'Delete a product by ID' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiResponse({ status: 403, description: 'Forbidden, Admin privileges required' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async deleteProduct(@Param('id') productId: string, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.deleteProduct(userId, productId);
    }
}