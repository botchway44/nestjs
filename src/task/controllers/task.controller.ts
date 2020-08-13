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
  UseGuards,
  Logger,
} from '@nestjs/common';
import { PostgresTaskService } from '../services/task.pg.service';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { SearchFilterDTO } from '../dto/get-task-filter-dto';
import { TaskStatusValidationPipe } from '../pipes/task-status-validation.pipe';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../model/taskstatus';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user-decorator';

@UseGuards(AuthGuard())
@Controller('task')
export class TaskController {
  private logger = new Logger('Task Controller');

  constructor(private taskService: PostgresTaskService) {}

  @Get()
  findAllTask(
    @GetUser() user: User,
    @Query(ValidationPipe) queryParams: SearchFilterDTO,
  ): Promise<Task[]> {
    // console.log(user);
    this.logger.verbose(`User ${user.username} access all tasks`);
    return this.taskService.getTasks(user, queryParams);
  }

  @Get('/:id')
  async getTaskById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe, ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.taskService.getTaskByID(user, id);
  }

  @Delete('/:id')
  deleteTaskById(
    @GetUser() user: User,
    @Param('id') id: number,
  ): Promise<Task> {
    // console.log(`Remove Task ${id} `);

    return this.taskService.deleteTaskByID(user, id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDTO,
  ): Promise<Task> {
    // console.log('add task');
    // console.log(user);
    return this.taskService.addTask(user, createTaskDto);
  }

  @Patch('/:id/status')
  updateTask(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    // console.log(status);
    return this.taskService.updateTaskStatus(user, id, status);
  }
}
