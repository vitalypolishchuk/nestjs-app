import { RoleEnum } from "src/models/role.model";

export interface JwtPayload {
    email: string;
    id: string;
    role: RoleEnum
}