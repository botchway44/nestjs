import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { PostgresTaskService } from './services/task.pg.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRespository } from './repository/TaskRespository';
import { Task } from './entities/task.entity';
import { TaskResolver } from './resolvers/task.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRespository])],
  controllers: [TaskController],
  providers: [PostgresTaskService, TaskResolver],
})
export class TaskModule {}
