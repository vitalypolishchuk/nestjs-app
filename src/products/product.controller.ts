import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGuard } from "src/guards/auth.guard";
import { AddProductDto } from "./dto/add-product.dto";
import { UpdateProduct } from "src/models/product.model";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(AuthGuard)
    @Post('/')
    async addProduct(@Body() addProductDto: AddProductDto, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.addProduct(userId, addProductDto);
    }

    @UseGuards(AuthGuard)
    @Get('/')
    async getAllProducts(@Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.getAllProducts(userId);
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async getProduct(@Param('id') productId: string, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.getProduct(userId, productId);
    }

    @UseGuards(AuthGuard)
    @Put('/:id')
    async updateProduct(@Param('id') productId: string, @Body() updateProductDto: UpdateProduct, @Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.updateProduct(userId, productId, updateProductDto);
    }
}