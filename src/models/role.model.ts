import { Schema, model } from 'mongoose';

export enum RoleEnum {
    Admin = "admin",
    User = 'user'
}

export interface RoleInterface {
    _id: string;
    email: string;
    role: RoleEnum
}

const roleSchema = new Schema<RoleInterface>({
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
});

export const RoleModel = model('Role', roleSchema, 'roles');