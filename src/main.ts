import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);

  // const app2 = await NestFactory.create(AppModule);
  // await app2.listen(4000);
}
bootstrap();
