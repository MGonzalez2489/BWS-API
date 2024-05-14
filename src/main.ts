import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './_config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  app.setGlobalPrefix('api');
  await app.listen(envs.port);
  logger.log(`SERVER STARTED ON PORT ${envs.port}`);
}
bootstrap();
