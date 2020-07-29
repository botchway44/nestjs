import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PostgresTaskService } from '../services/task.pg.service';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { SearchFilterDTO } from '../dto/get-task-filter-dto';
import { TaskStatusValidationPipe } from '../pipes/task-status-validation.pipe';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../model/taskstatus';

@Controller('task')
export class TaskController {
  constructor(private taskService: PostgresTaskService) {}

  // // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get()
  findAllTask(
    @Query(ValidationPipe) queryParams: SearchFilterDTO,
  ): Promise<Task[]> {
    return this.taskService.getTasks(queryParams);
  }

  // // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe, ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.taskService.getTaskByID(id);
  }

  // // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Delete('/:id')
  deleteTaskById(@Param('id') id: number): Promise<Task> {
    console.log(`Remove Task ${id} `);

    return this.taskService.deleteTaskByID(id);
  }
  // // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post()
  @UsePipes(ValidationPipe)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
    console.log('add task');
    return this.taskService.addTask(createTaskDto);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Patch('/:id/status')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    console.log(status);
    return this.taskService.updateTaskStatus(id, status);
  }
}
