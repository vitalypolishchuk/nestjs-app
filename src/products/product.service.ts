import { Injectable } from "@nestjs/common";
import { Product, ProductModel, UpdateProduct } from "src/models/product.model";
import { Types } from 'mongoose';
import { AddProductDto } from "./dto/add-product.dto";

@Injectable()
export class ProductService {
    async addProduct(userId: string, addProductDto: AddProductDto): Promise<Product> {
        const product = new ProductModel({
            userId: new Types.ObjectId(userId), // Convert to ObjectId
            productName: addProductDto.productName,
            productType: addProductDto.productType
        });
        return await product.save(); // Save the product to the database
    }

    async getAllProducts(userId: string): Promise<Product[]>{
        return await ProductModel.find({ userId }).exec();
    }

    async getProduct(userId: string, productId: string): Promise<Product | null> {
        const product = await ProductModel.findOne({ userId, _id: productId }).exec();
        return product as Product | null;
    }

    async updateProduct(userId: string, productId: string, updateProductDto: UpdateProduct): Promise<Product | null> {
        const updatedProduct = await ProductModel.findOneAndUpdate(
            { userId: new Types.ObjectId(userId), _id: new Types.ObjectId(productId) }, // Find by userId and productId
            { $set: updateProductDto }, // Update only provided fields
            { new: true } // Return the updated product
        );
        return updatedProduct;
    }
}