import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { BasketService } from "./baskets.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('basket') // Group all basket-related routes under the 'basket' tag in Swagger
@ApiBearerAuth()  // Indicate that JWT auth is used for protected routes in this controller
@Controller('products/basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) {}

    @UseGuards(AuthGuard)
    @Get('/') 
    @ApiOperation({ summary: 'Get all products in the user\'s basket' })
    @ApiResponse({ status: 200, description: 'Products retrieved successfully from basket' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getProductsFromBasket(@Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.basketService.getProductsFromBasket(userId);
    }

    @UseGuards(AuthGuard)
    @Post('/:id')
    @ApiOperation({ summary: 'Add a product to the user\'s basket by product ID' })
    @ApiResponse({ status: 201, description: 'Product added to basket successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async addProductToBasket(@Param('id') productId: string, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.basketService.addProductToBasket(userId, productId);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    @ApiOperation({ summary: 'Remove a product from the user\'s basket by product ID' })
    @ApiResponse({ status: 200, description: 'Product removed from basket successfully' })
    @ApiResponse({ status: 404, description: 'Product not found in basket' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async deleteProductFromBasket(@Param('id') productId: string, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.basketService.deleteProductFromBasket(userId, productId);
    }
}