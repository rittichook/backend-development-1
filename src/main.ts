import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { EStage } from './config/dto/config.dto';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { ValidationExceptionFactory } from './exception/validation-exception-factory';
import { ResponseInterceptor } from './interceptor/response.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config: ConfigService = app.get<ConfigService>(ConfigService);
  const PORT: number = config.get('PORT') || 3000;
  const logger = new Logger('Application');

  // Response pattern
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: ValidationExceptionFactory,
    }),
  );

  // prefix route
  app.setGlobalPrefix('api/v1');

  // Swagger
  const swaggerOption = new DocumentBuilder()
    .setTitle('BlockCorp API Document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOption);
  if (config.get('STAGE') === EStage.DEVELOPMENT) {
    SwaggerModule.setup('api/v1', app, document, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        displayRequestDuration: true,
      },
    });
  }

  await app.listen(PORT);
  logger.log(`Listening on port: ${PORT}`);
}
void bootstrap();
