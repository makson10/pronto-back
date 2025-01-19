import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// import * as cookieParser from 'cookie-parser';
// import * as session from 'express-session';
import cookieParser from 'cookie-parser';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_COOKIES_PASSWORD,
      resave: false,
      saveUninitialized: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Pronto')
    .setDescription('Swagger documentation for pronto backend')
    .setVersion('1.0')
    .addTag('pronto')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(4000);
}
bootstrap();
