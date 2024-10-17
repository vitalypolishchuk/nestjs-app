import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { AuthGuard } from "src/guards/auth.guard";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Use a secure secret
            signOptions: { expiresIn: '1h' }, // Optional: Set token expiration
        }),
    ],
    controllers: [ProductController],
    providers: [ProductService, AuthGuard]
})

export class ProductModule {}