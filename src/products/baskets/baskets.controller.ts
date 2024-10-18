import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { BasketService } from "./baskets.service";

@Controller('products/basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) {}

    @UseGuards(AuthGuard)
    @Get('/') // This endpoint will get all products for the authenticated user
    async getProductsFromBasket(@Req() request: any) {
        console.log("/")
        const userId = request.user.id; // Get user ID from JWT
        return await this.basketService.getProductsFromBasket(userId);
    }

    @UseGuards(AuthGuard)
    @Post('/:id')
    async addProductToBasket(@Param('id') productId: string, @Req() request: any) {
        console.log("/:id")
        const userId = request.user.id; // Get user ID from JWT
        return await this.basketService.addProductToBasket(userId, productId);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    async deleteProductFromBasket(@Param('id') productId: string, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.basketService.deleteProductFromBasket(userId, productId);
    }
}