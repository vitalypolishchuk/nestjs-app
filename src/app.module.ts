import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./products/product.module";
import { CacheModule } from "@nestjs/cache-manager";
import { BasketModule } from "./products/baskets/baskets.module";
import { ResponseHeaderMiddleware } from "./middleware/response-header.middleware";
import { ChatModule } from "./chat/chat.module";

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true // Makes it accessible globally without importing in each module
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService], // inject ConfigService into the factory function
    useFactory: (configService: ConfigService) => {
      const uri = configService.get<string>('MONGODB_URI');
      console.log(`Connecting to Mongo DB: ${uri}`)
      return { 
        uri,
      };
    },
  }),
  CacheModule.register({
    ttl: 5, // Time to live in seconds
    max: 100, // Maximum number of items in cache
    isGlobal: true, // Set CacheModule as global
  }),
  DatabaseModule,
  AuthModule,
  UserModule,
  ProductModule,
  BasketModule,
  ChatModule
  ],
  providers: []
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ResponseHeaderMiddleware) // Apply the middleware globally
      .forRoutes('*'); // Applies to all routes, you can specify specific routes here if needed
  }
}
