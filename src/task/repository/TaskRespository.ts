import { Task } from '../entities/task.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { TaskStatus } from '../model/taskstatus';

@EntityRepository(Task)
export class TaskRespository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const task: Task = new Task();
    task.description = createTaskDto.description;
    task.title = createTaskDto.title;
    task.status = TaskStatus.OPEN;

    await this.insert(task);
    // task.
    return task;
  }
}
