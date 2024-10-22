import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGuard } from "src/guards/auth.guard";
import { AddProductDto } from "./dto/add-product.dto";
import { AdminGuard } from "src/guards/admin.guard";
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticatedRequest } from "src/common/types";
import { CreateProductSwagger } from "./swagger/create-product-swagger.decorator";
import { GetAllProductsSwagger } from "./swagger/get-all-products-swagger.decorator";
import { GetProductDetailsSwagger } from "./swagger/get-product-details-swagger.decorator";
import { DeleteProductSwagger } from "./swagger/delete-product-swagger.decorator";

@ApiTags('products') // Group all product-related routes under the 'products' tag in Swagger
@ApiBearerAuth()  // Indicate that JWT auth is used for protected routes in this controller
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(AuthGuard, AdminGuard)
    @Post('/')
    @CreateProductSwagger()
    async createProduct(@Body() addProductDto: AddProductDto, @Req() request: AuthenticatedRequest) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.createProduct(userId, addProductDto);
    }

    @Get('/')
    @GetAllProductsSwagger()
    async getAllProducts() {
        return await this.productService.getAllProducts();
    }

    @UseGuards(AuthGuard)
    @Get('details/:id')
    @GetProductDetailsSwagger()
    async getProduct(@Param('id') productId: string, @Req() request: AuthenticatedRequest) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.getProduct(userId, productId);
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Delete('details/:id')
    @DeleteProductSwagger()
    async deleteProduct(@Param('id') productId: string, @Req() request: AuthenticatedRequest) {
        const userId = request.user.id; // Get user ID from JWT
        return await this.productService.deleteProduct(userId, productId);
    }
}