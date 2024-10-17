import { Injectable, NotFoundException } from "@nestjs/common";
import { Product, ProductModel } from "src/models/product.model";
import { Types } from 'mongoose';
import { AddProductDto } from "./dto/add-product.dto";
import { UserProductModel } from "src/models/user-product.model";
import { UserService } from "src/user/user.service";

@Injectable()
export class ProductService {
    constructor(private readonly userService: UserService) {}

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

        return product; // Return the newly created product
    }

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

        return { message: 'Product successfully added to the basket' }; // Return success message
    }

    async getProductsFromBasket(userId: string): Promise<Product[]> {
        const userProducts = await UserProductModel.find({ userId: new Types.ObjectId(userId) }).exec();
        const productIds = userProducts.map(up => up.productId);

        return await ProductModel.find({ _id: { $in: productIds } }).exec();
    }

    async getAllProducts(): Promise<Product[]> {
        return await ProductModel.find().exec();
    }

    async getProduct(userId: string, productId: string): Promise<Product | null> {
        const product = await ProductModel.findOne({ 
            userId: new Types.ObjectId(userId), 
            _id: new Types.ObjectId(productId) 
        }).exec();

        if (!product) {
            throw new NotFoundException(`Product not found or you do not have permission to access this product`);
        }

        return product;
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
    
        return { message: 'Product successfully deleted' };
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
    
        return { message: 'Product successfully deleted from the user\'s basket' };
    }
}
