import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Product, ProductModel } from "src/models/product.model";
import { Types } from 'mongoose';
import { AddProductDto } from "./dto/add-product.dto";
import { UserProductModel } from "src/models/user-product.model";
import { UserService } from "src/user/user.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class ProductService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private userService: UserService, // Inject UserService
    ) {}

    async createProduct(userId: string, addProductDto: AddProductDto): Promise<Product> {
        // Validate if the user exists
        const user = await this.userService.getUser(userId);
        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        // Create a new product
        const product = new ProductModel({
            userId,
            productName: addProductDto.productName,
            productType: addProductDto.productType,
        });

        await product.save(); // Save the product to the database

        // Invalidate cache after product creation
        await this.cacheManager.del('all_products');

        return product; // Return the newly created product
    }

    async getProduct(userId: string, productId: string): Promise<Product | null> {
        const cacheKey = `product_${productId}`;
        const cachedProduct = await this.cacheManager.get<Product>(cacheKey);
        if (cachedProduct) {
            return cachedProduct;
        }

        const product = await ProductModel.findOne({ 
            userId: new Types.ObjectId(userId), 
            _id: new Types.ObjectId(productId) 
        }).exec();

        if (!product) {
            throw new NotFoundException(`Product not found or you do not have permission to access this product`);
        }

        // Cache the product
        await this.cacheManager.set(cacheKey, product, 1000 * 60); // Set TTL as appropriate

        return product;
    }

    async getAllProducts(): Promise<Product[]> {
        const cachedProducts = await this.cacheManager.get<Product[]>('all_products');
        if (cachedProducts) {
            return cachedProducts;
        }

        const products = await ProductModel.find().exec();

        // Cache the product list
        await this.cacheManager.set('all_products', products, 1000 * 60); // Set TTL as appropriate

        return products;
    }

    async deleteProduct(userId: string, productId: string): Promise<{ message: string }> {
        const product = await ProductModel.findOne({ userId: new Types.ObjectId(userId), _id: new Types.ObjectId(productId) });
        if (!product) {
            throw new NotFoundException(`Product not found or you do not have permission to delete this product`);
        }

        // Delete the product from all user baskets
        await UserProductModel.deleteMany({ productId: new Types.ObjectId(productId) });

        // Now delete the product itself
        await ProductModel.deleteOne({ _id: new Types.ObjectId(productId) });

        // Invalidate cache after deletion
        await this.cacheManager.del(`product_${productId}`); // Invalidate the specific product cache
        await this.cacheManager.del('all_products'); // Invalidate the product list cache

        return { message: 'Product successfully deleted' };
    }
}