import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./interceptors/response.interseptor";
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from "./filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use(cookieParser()); // Add this line to enable cookie parsing

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3333);
}
bootstrap();
