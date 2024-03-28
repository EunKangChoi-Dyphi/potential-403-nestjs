import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomConfigService } from './modules/core/config/custom-config.service';
import ENV_KEY from './modules/core/config/constants/env-config.constant';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './modules/core/database/prisma/prisma.service';
import CORS_OPTIONS from 'src/modules/core/config/constants/cors-option.constant';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from 'src/filters/all-exception.filter';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import '@js-joda/timezone';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new AllExceptionFilter()
    , new HttpExceptionFilter()
  );
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // 들어오는 요청의 payload를 DTO의 타입으로 변환
  }));


  const customConfigService = app.get<CustomConfigService>(CustomConfigService);
  const isProduction = customConfigService.isProduction();

  // Prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  if (isProduction) {
    // 운영버젼
  }

  // Pipes

  // Interceptors
  // Filters

  // helmet
  app.use(helmet());

  // CORS
  app.enableCors(CORS_OPTIONS);

  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('api-docs')
    .setDescription('API Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  // Run server
  const SERVER_PORT =
    customConfigService.get<number>(ENV_KEY.SERVER_PORT) || 3000;
  await app.listen(SERVER_PORT);
}
bootstrap();
