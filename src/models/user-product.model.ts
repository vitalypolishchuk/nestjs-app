import { Schema, Document, model, Types } from 'mongoose';

export interface UserProduct extends Document {
    userId: Types.ObjectId;
    productId: Types.ObjectId;
}

const UserProductSchema = new Schema<UserProduct>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
});

export const UserProductModel = model<UserProduct>('UserProduct', UserProductSchema, 'userProduct');