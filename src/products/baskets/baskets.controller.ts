import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { BasketService } from "./baskets.service";
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticatedRequest } from "src/common/types";
import { GetUserBasketProductsSwagger } from "./swagger/get-user-product-basket-swagger.decorator";
import { AddProductToBasketSwagger } from "./swagger/add-product-basket-swagger.decorator";
import { RemoveProductFromBasketSwagger } from "./swagger/remove-product-basket-swagger.decorator";

@ApiTags('basket') // Group all basket-related routes under the 'basket' tag in Swagger
@ApiBearerAuth()  // Indicate that JWT auth is used for protected routes in this controller
@Controller('products/basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) {}

    @UseGuards(AuthGuard)
    @Get('/') 
    @GetUserBasketProductsSwagger()
    async getProductsFromBasket(@Req() request: AuthenticatedRequest) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.basketService.getProductsFromBasket(userId);
    }

    @UseGuards(AuthGuard)
    @Post('/:id')
    @AddProductToBasketSwagger()
    async addProductToBasket(@Param('id') productId: string, @Req() request: AuthenticatedRequest) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.basketService.addProductToBasket(userId, productId);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    @RemoveProductFromBasketSwagger()
    async deleteProductFromBasket(@Param('id') productId: string, @Req() request: AuthenticatedRequest) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.basketService.deleteProductFromBasket(userId, productId);
    }
}