import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { PrismaExceptionFilter } from '@/prisma/prisma-exception.filter';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
  Logger.debug(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
