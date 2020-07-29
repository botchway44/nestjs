import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { PostgresTaskService } from './services/task.pg.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRespository } from './repository/TaskRespository';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRespository])],
  controllers: [TaskController],
  providers: [PostgresTaskService],
})
export class TaskModule {}
