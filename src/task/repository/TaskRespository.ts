import { Task } from '../entities/task.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { TaskStatus } from '../model/taskstatus';
import { User } from 'src/auth/entities/user.entity';

@EntityRepository(Task)
export class TaskRespository extends Repository<Task> {
  async createTask(user: User, createTaskDto: CreateTaskDTO): Promise<Task> {
    const task: Task = new Task();
    task.description = createTaskDto.description;
    task.title = createTaskDto.title;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;

    return task;
  }
}
