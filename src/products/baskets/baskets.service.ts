import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Product, ProductModel } from "src/models/product.model";
import { Types } from 'mongoose';
import { UserProductModel } from "src/models/user-product.model";
import { UserService } from "src/user/user.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class BasketService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private userService: UserService, // Inject UserService
    ) {}

    async addProductToBasket(userId: string, productId: string): Promise<any> {
        // Validate if the user exists
        const user = await this.userService.getUser(userId);
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
    
        // Associate the product with the user in a UserProductModel
        const userProduct = new UserProductModel({
            userId: new Types.ObjectId(userId), // Associate with user
            productId: new Types.ObjectId(productId), // Associate with product
        });
    
        await userProduct.save(); // Save the association to the database
    
        // Invalidate the cache for the user's basket
        await this.cacheManager.del(`basket_${userId}`);
    
        return { message: 'Product successfully added to the basket' }; // Return success message
    }

    async getProductsFromBasket(userId: string): Promise<Product[]> {
        const cacheKey = `basket_${userId}`;
        const cachedProducts = await this.cacheManager.get<Product[]>(cacheKey);
        if (cachedProducts) {
            return cachedProducts; // Return cached products if available
        }
    
        // Fetch user's products from the database
        const userProducts = await UserProductModel.find({ userId: new Types.ObjectId(userId) }).exec();
        const productIds = userProducts.map(up => up.productId);
    
        const products = await ProductModel.find({ _id: { $in: productIds } }).exec();
    
        // Cache the products in the user's basket
        await this.cacheManager.set(cacheKey, products, 1000 * 60); // Set TTL as appropriate
    
        return products;
    }

    async deleteProductFromBasket(userId: string, productId: string): Promise<{ message: string }> {
        // Validate if the user exists
        const user = await this.userService.getUser(userId);
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
    
        // Delete the product from the user's basket only
        const result = await UserProductModel.deleteOne({ userId: new Types.ObjectId(userId), productId: new Types.ObjectId(productId) });
    
        // Check if any documents were deleted
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Product not found in the user's basket`);
        }
    
        // Invalidate the cache for the user's basket after deletion
        await this.cacheManager.del(`basket_${userId}`);
    
        return { message: 'Product successfully deleted from the user\'s basket' };
    }
}