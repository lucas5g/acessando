import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from '@/prisma/prisma-exception.filter';
import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.useGlobalFilters(new PrismaExceptionFilter())
    .useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Acessando API')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('doc', app, documentFactory)

  await app.listen(process.env.PORT ?? 3000);
  Logger.debug(`Application is running on: ${await app.getUrl()}/doc`);
}
bootstrap();
