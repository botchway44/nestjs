import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { PostgresTaskService } from './services/task.pg.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRespository } from './repository/taskRespository';
import { Task } from './entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRespository]), AuthModule],
  controllers: [TaskController],
  providers: [PostgresTaskService],
})
export class TaskModule {}
