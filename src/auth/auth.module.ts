import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
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
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {}