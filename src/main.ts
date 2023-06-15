import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GlobalExceptionFilter } from "./util/exception/exception.filter";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * 전역 DTO 유효성 검사
   */
  app.useGlobalPipes(
    new ValidationPipe({
      // DTO에 정의되지 않은 속성이 들어오면 에러
      whitelist: true,
      forbidNonWhitelisted: true,
      // DTO에 정의된 타입으로 자동 변환
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  /**
   * 전역 에러 핸들링
   */
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));

  await app.listen(3000);
}
bootstrap();
