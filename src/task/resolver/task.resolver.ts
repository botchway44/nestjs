import { Resolver, Query, Args } from '@nestjs/graphql';
import { PostgresTaskService } from '../services/task.pg.service';
import { Task } from '../entities/task.entity';

@Resolver((of) => Task)
export class TaskResolver {
  constructor(private taskService: PostgresTaskService) {}

  @Query(() => [Task], { name: 'tasks' })
  async task(): Promise<Task[]> {
    return await this.taskService.getAllTask();
  }
}
