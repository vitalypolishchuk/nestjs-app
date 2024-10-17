import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { AuthGuard } from "src/guards/auth.guard";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import { UserModule } from "src/user/user.module";
dotenv.config();

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Use a secure secret
            signOptions: { expiresIn: '1h' }, // Optional: Set token expiration
        }),
        UserModule
    ],
    controllers: [ProductController],
    providers: [ProductService, AuthGuard]
})

export class ProductModule {}