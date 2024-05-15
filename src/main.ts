import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './_config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  //global prefixes
  app.setGlobalPrefix('api');
  //global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove everything not included in the DTO
      forbidNonWhitelisted: true, //bad request for not required props
    }),
  );
  //
  await app.listen(envs.port);
  logger.log(`==== SERVER STARTED ON PORT ${envs.port} ====`);
}
bootstrap();
