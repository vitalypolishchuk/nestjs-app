import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGuard } from "src/guards/auth.guard";
import { AddProductDto } from "./dto/add-product.dto";
import { AdminGuard } from "src/guards/admin.guard";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(AuthGuard, AdminGuard)
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
    @Get('details/:id')
    async getProduct(@Param('id') productId: string, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.getProduct(userId, productId);
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Delete('details/:id')
    async deleteProduct(@Param('id') productId: string, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.deleteProduct(userId, productId);
    }
}