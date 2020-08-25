import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Task Api')
    .setDescription('The Api for Task App')
    .setVersion('1.0')
    .addTag('task')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  // const app2 = await NestFactory.create(AppModule);
  // await app2.listen(4000);

  Logger.log(`Application running on port ${port}`);
}
bootstrap();
