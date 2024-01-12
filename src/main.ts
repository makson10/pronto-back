import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true });
  app.enableCors({ origin: true, credentials: true });

  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET_SIGN,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 28 * 24 * 60 * 60 * 1000,
      },
    }),
  );

  await app.listen(4000);
}
bootstrap();
