import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from '../task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMOptions } from '../config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMOptions), TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
