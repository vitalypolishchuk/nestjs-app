import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./products/product.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true // Makes it accessible globally without importing in each module
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const jwtSecret = configService.get<string>('JWT_SECRET');
      console.log('JWT_SECRET:', jwtSecret); // Check if this is logging the correct value
      return {
        secret: jwtSecret,
        signOptions: { expiresIn: '1h' },
      };
    },
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
  providers: [],
  exports: [JwtModule]
})
export class AppModule {}
