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

  @Get()
  findAllTask(
    @Query(ValidationPipe) queryParams: SearchFilterDTO,
  ): Promise<Task[]> {
    return this.taskService.getTasks(queryParams);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe, ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.taskService.getTaskByID(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: number): Promise<Task> {
    console.log(`Remove Task ${id} `);

    return this.taskService.deleteTaskByID(id);
  }

  /**
   *
   * @param createTaskDto
   * @description Collects and adds a task to the database
   */
  @Post()
  @UsePipes(ValidationPipe)
  addTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
    console.log('add task');
    return this.taskService.addTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    console.log(status);
    return this.taskService.updateTaskStatus(id, status);
  }
}
