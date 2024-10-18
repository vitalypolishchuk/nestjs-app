import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { AuthGuard } from "src/guards/auth.guard";
import * as dotenv from 'dotenv';
import { UserModule } from "src/user/user.module";

dotenv.config();

@Module({
    imports: [
        UserModule,
    ],
    controllers: [ProductController],
    providers: [ProductService, AuthGuard]
})

export class ProductModule {}