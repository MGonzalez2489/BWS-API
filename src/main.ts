import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './_config';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors';

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
  //global interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  //SWAGGER
  const config = new DocumentBuilder()
    .setTitle('BWS API')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(envs.port);
  logger.log(`==== SERVER STARTED ON PORT ${envs.port} ====`);
}
bootstrap();
