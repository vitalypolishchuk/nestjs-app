import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthGuard } from "src/guards/auth.guard";
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, AuthGuard],
    exports: [UserService]
})

export class UserModule {}