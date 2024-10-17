import { Schema, model, Types } from 'mongoose';

export type ProductType = "Electronics" | "Clothing" | "Home Appliances" | "Beauty Products" | "Sporting Goods"

export interface Product {
    readonly _id: string;
    userId: Types.ObjectId;
    productName: string;
    productType: ProductType;
    createdAt: Date;
}

export type AddProduct = Omit<Product, "_id" | "createdAt">

const productSchema = new Schema<Product>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productName: { type: String, required: true },
    productType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const ProductModel = model('Product', productSchema, 'products')