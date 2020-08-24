import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';
import { PostgresTaskService } from '../services/task.pg.service';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { TaskStatus } from '../model/taskstatus';

@Resolver((of) => Task)
export class TaskResolver {
  constructor(private taskService: PostgresTaskService) {}

  @Query(() => [Task])
  async allTask(): Promise<Task[]> {
    return this.taskService.getAllTask();
  }

  @Query(() => Task)
  async getTaskById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Task> {
    return this.taskService.getTaskByID(id);
  }

  @Mutation(() => Task)
  deleteTaskById(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    console.log(`Remove Task ${id} `);
    return this.taskService.deleteTaskByID(id);
  }

  @Mutation(() => Task)
  addTask(
    @Args('createTaskDTO', { type: () => CreateTaskDTO })
    createTaskDTO: CreateTaskDTO,
  ): Promise<Task> {
    return this.taskService.addTask(createTaskDTO);
  }

  @Mutation(() => Task)
  updateTask(
    @Args('status', { type: () => TaskStatus })
    status: TaskStatus,

    @Args('id', { type: () => Int }) id: number,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }
}
