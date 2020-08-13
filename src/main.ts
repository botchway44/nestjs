import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 3000;
  await app.listen(port);

  // const app2 = await NestFactory.create(AppModule);
  // await app2.listen(4000);

  Logger.log(`Application running on port ${port}`);
}
bootstrap();
