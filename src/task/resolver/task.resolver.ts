import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { PostgresTaskService } from '../services/task.pg.service';
import { Task } from '../entities/task.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/strategies/gql.auth.guard';
import { CurrentUser } from 'src/auth/decorators/get-user-decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { TaskStatus } from '../model/taskstatus';

@UseGuards(GqlAuthGuard)
@Resolver((of) => Task)
export class TaskResolver {
  constructor(private taskService: PostgresTaskService) {}

  @Query(() => [Task], { name: 'tasks' })
  async task(): Promise<Task[]> {
    return await this.taskService.getAllTask();
  }

  @Query(() => [Task], {
    name: 'getAllTask',
    description: 'Returns all the task for a particular User',
  })
  async allTask(@CurrentUser() user: User): Promise<Task[]> {
    return this.taskService.getAllTasks(user);
  }

  @Query(() => Task, {
    name: 'getTaskById',
    description: 'Returns all the task for a particular User by a given ID',
  })
  async getTaskById(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskByID(user, id);
  }

  @Mutation(() => Task, {
    name: 'deleteTaskById',
    description: 'Deletes a specific task for a particular User by a given ID',
  })
  deleteTaskById(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ): Promise<Task> {
    console.log(`Remove Task ${id} `);
    return this.taskService.deleteTaskByID(user, id);
  }

  @Mutation(() => Task, {
    name: 'addTask',
    description: "Adds task to a Specific User's List of Tasks",
  })
  addTask(
    @Args('createTaskDTO', { type: () => CreateTaskDTO })
    createTaskDTO: CreateTaskDTO,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return this.taskService.addTask(user, createTaskDTO);
  }

  @Mutation(() => Task, {
    name: 'updateTask',
    description: "Updates a  task for a Specific User's List of Tasks",
  })
  updateTask(
    @Args('status', { type: () => TaskStatus })
    status: TaskStatus,
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(user, id, status);
  }
}
