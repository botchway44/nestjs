import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';
import { PostgresTaskService } from '../services/task.pg.service';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { TaskStatus } from '../model/taskstatus';

@Resolver((of) => Task)
export class TaskResolver {
  constructor(private taskService: PostgresTaskService) {}

  @Query(() => [Task], {
    name: 'getAllTask',
    description: 'Returns all the task for a particular User',
  })
  async allTask(): Promise<Task[]> {
    return this.taskService.getAllTask();
  }

  @Query(() => Task, {
    name: 'getTaskById',
    description: 'Returns all the task for a particular User by a given ID',
  })
  async getTaskById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Task> {
    return this.taskService.getTaskByID(id);
  }

  @Mutation(() => Task, {
    name: 'deleteTaskById',
    description: 'Deletes a specific task for a particular User by a given ID',
  })
  deleteTaskById(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    console.log(`Remove Task ${id} `);
    return this.taskService.deleteTaskByID(id);
  }

  @Mutation(() => Task, {
    name: 'addTask',
    description: "Adds task to a Specific User's List of Tasks",
  })
  addTask(
    @Args('createTaskDTO', { type: () => CreateTaskDTO })
    createTaskDTO: CreateTaskDTO,
  ): Promise<Task> {
    return this.taskService.addTask(createTaskDTO);
  }

  @Mutation(() => Task, {
    name: 'updateTask',
    description: "Updates a  task for a Specific User's List of Tasks",
  })
  updateTask(
    @Args('status', { type: () => TaskStatus })
    status: TaskStatus,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }
}
