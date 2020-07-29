import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { SearchFilterDTO } from '../dto/get-task-filter-dto';
import { TaskRespository } from '../repository/TaskRespository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../model/taskstatus';
import { title } from 'process';
import { Like } from 'typeorm';
@Injectable()
export class PostgresTaskService {
  /**Contains all tasks */

  constructor(
    @InjectRepository(TaskRespository) private taskRepository: TaskRespository,
  ) {}

  /**
   * Returns an array of tasks based on a filter
   * @param queryParams
   */
  async searchByFilter(queryParams: SearchFilterDTO): Promise<Task[]> {
    const { query, status } = queryParams;

    console.log('Searching with ');
    //Work more on query and filtering with task repository
    // const tasks = await this.getAllTask();
    const resultHolder = this.taskRepository.find({
      title: Like(`%${query}%`),
      status: status,
    });

    // if (status) {
    //   resultHolder = tasks.filter((task) => task.status == status);
    // }

    return resultHolder;
    // if (query) throw new Error('Method not implemented.');
  }

  /**
   * Adds a task to the task List
   * @param createTaskDto
   */
  async addTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  /**
   * Gets a task by Id
   * @param id
   */
  async getTaskByID(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

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
  async deleteTaskByID(id: number): Promise<Task> {
    const temp = this.getTaskByID(id);
    // this.taskRepository.remove();
    if (temp) await this.taskRepository.delete({ id: id });
    // const tempList = this.task.filter((task) => task.id != id);
    // this.tasks = tempList;
    return temp;
  }

  // /**
  //  * Updates a task status based on the Id
  //  * @param id
  //  * @param status
  //  */
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const temp: Task = this.getTaskByID(id);
  //   temp.status = status;
  //   return temp;
  // }

  // /**
  //  * Returns all task
  //  */
  getAllTask(): Promise<Task[]> {
    return this.taskRepository.find({});
  }
}
