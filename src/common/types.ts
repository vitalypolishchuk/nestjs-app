import { RoleEnum } from "src/models/role.model";

export interface JwtPayload {
    email: string;
    id: string;
    role: RoleEnum
}

export interface AuthenticatedRequest extends Request {
    user: JwtPayload;
  }