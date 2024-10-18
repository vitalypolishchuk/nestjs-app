import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
import { UserModule } from "src/user/user.module";
import { BasketController } from "./baskets.controller";
import { BasketService } from "./baskets.service";
dotenv.config();

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Use a secure secret
            signOptions: { expiresIn: '1h' }, // Optional: Set token expiration
        }),
        UserModule
    ],
    controllers: [BasketController],
    providers: [BasketService]
})

export class ProductModule {}