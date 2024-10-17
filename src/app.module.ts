import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./products/product.module";

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
  DatabaseModule,
  AuthModule,
  UserModule,
  ProductModule
  ],
  providers: []
})
export class AppModule {}
