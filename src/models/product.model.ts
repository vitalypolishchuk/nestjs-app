import { Schema, model, Types } from 'mongoose';

export type ProductType = "Electronics" | "Clothing" | "Home Appliances" | "Beauty Products" | "Sporting Goods"

export interface Product {
    readonly _id: string;
    userId: Types.ObjectId;
    productName: string;
    productType: ProductType;
    createdAt: Date;
    updatedAt: Date;
}

export type AddProduct = Omit<Product, "_id" | "createdAt" | "updatedAt">
export type UpdateProduct = Partial<Pick<Product, "productName" | "productType">>

const productSchema = new Schema<Product>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    productName: { type: String, required: true },
    productType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const ProductModel = model('Product', productSchema, 'products')