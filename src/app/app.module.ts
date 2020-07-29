import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from '../task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMOptions } from '../config/typeorm.config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMOptions), TaskModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
