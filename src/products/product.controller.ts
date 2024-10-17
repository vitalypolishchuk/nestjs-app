import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGuard } from "src/guards/auth.guard";
import { AddProductDto } from "./dto/add-product.dto";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(AuthGuard)
    @Post('/')
    async createProduct(@Body() addProductDto: AddProductDto, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.createProduct(userId, addProductDto);
    }

    // Available for all users
    @Get('/')
    async getAllProducts() {
        return await this.productService.getAllProducts();
    }

    @UseGuards(AuthGuard)
    @Get('/basket') // This endpoint will get all products for the authenticated user
    async getProductsFromBasket(@Req() request: any) {
        console.log("Fetching products from basket");
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.getProductsFromBasket(userId);
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async getProduct(@Param('id') productId: string, @Req() request: any) {
        console.log("Fetching product by ID");
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.getProduct(userId, productId);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    async deleteProduct(@Param('id') productId: string, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.deleteProduct(userId, productId);
    }

    @UseGuards(AuthGuard)
    @Post('/basket/:id')
    async addProductToBasket(@Param('id') productId: string, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.addProductToBasket(userId, productId);
    }

    @UseGuards(AuthGuard)
    @Delete('/basket/:id')
    async deleteProductFromBasket(@Param('id') productId: string, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.deleteProductFromBasket(userId, productId);
    }
}