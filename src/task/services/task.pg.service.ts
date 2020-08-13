import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { SearchFilterDTO } from '../dto/get-task-filter-dto';
import { TaskRespository } from '../repository/taskRespository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../model/taskstatus';
import { User } from 'src/auth/entities/user.entity';
@Injectable()
export class PostgresTaskService {
  /**Contains all tasks */

  constructor(
    @InjectRepository(TaskRespository) private taskRepository: TaskRespository,
  ) {}

  /**
   * Returns an array of tasks based on a filter
   * @param queryParams
   * @todo Fix QueryBuilder to get required results
   */
  async getTasks(user: User, queryParams: SearchFilterDTO): Promise<Task[]> {
    const { query, status } = queryParams;

    // console.log(`Searching with  ${query} and ${status}`);
    //Work more on query and filtering with task repository
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }
    if (query) {
      queryBuilder.andWhere(
        'task.title LIKE :query OR task.description LIKE :query',
        { query: `%${query}%` },
      );
    }

    const id = user.id;
    // console.log(id);
    queryBuilder.andWhere('task.userId = :id', { id });
    const res = await queryBuilder.getMany();

    return res;
    // if (status) {
    //   resultHolder = tasks.filter((task) => task.status == status);
    // }

    // return resultHolder;
    // if (query) throw new Error('Method not implemented.');
  }

  /**
   * Adds a task to the task List
   * @param createTaskDto
   */
  async addTask(user: User, createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(user, createTaskDto);
  }

  /**
   * Gets a task by Id
   * @param id
   */
  async getTaskByID(user: User, id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
    });

    //throw an exception that will be caught by the
    //Nest Hanldler
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return found;
  }

  /**
   * Deletes a task by ID
   * @param id
   */
  async deleteTaskByID(user: User, id: number): Promise<Task> {
    const temp = this.getTaskByID(user, id);
    // this.taskRepository.remove();
    if (temp) {
      const res = await this.taskRepository.delete({ id: id });
      if (res.affected == 0)
        throw new NotFoundException(`Task with id ${id} not found`);
    }

    return temp;
  }

  /**
   * Updates a task status based on the Id
   * @param id
   * @param status
   */
  async updateTaskStatus(
    user: User,
    id: number,
    status: TaskStatus,
  ): Promise<Task> {
    const temp = await this.getTaskByID(user, id);

    if (temp) {
      temp.status = status;
      temp.save();
      // this.taskRepository.update({ id: id }, { id, status });
    } else {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return temp;
  }

  // /**
  //  * Returns all task
  //  */
  getAllTask(): Promise<Task[]> {
    return this.taskRepository.find({});
  }
}
