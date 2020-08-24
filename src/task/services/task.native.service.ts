import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SearchFilterDTO } from '../dto/get-task-filter-dto';
import { TaskModel } from '../model/task.model';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { TaskStatus } from '../model/taskstatus';
import { TaskServiceModel } from './task.model.service';
export class NativeTaskService implements TaskServiceModel<TaskModel, string> {
  /**Contains all tasks */
  private tasks = [];

  /**
   * Returns an array of tasks based on a filter
   * @param queryParams
   */
  async searchByFilter(queryParams: SearchFilterDTO): Promise<TaskModel[]> {
    const { query, status } = queryParams;

    let tasks: TaskModel[] = await this.getAllTask();
    if (query) {
      tasks = tasks.filter((task) => task.title.includes(query));
    }

    if (status) {
      tasks = tasks.filter((task) => task.status == status);
    }

    return tasks;
    // if (query) throw new Error('Method not implemented.');
  }

  /**
   * Adds a task to the task List
   * @param createTaskDto
   */
  async addTask(createTaskDto: CreateTaskDTO): Promise<TaskModel> {
    const task: TaskModel = await {
      id: uuidv4(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    console.log(uuidv4);
    return task;
  }

  /**
   * Gets a task by Id
   * @param id
   */
  async getTaskByID(id: string): Promise<TaskModel> {
    const list = await this.tasks.find((task) => task.id == id);

    //throw an exception that will be caught by the
    //Nest Hanldler
    if (!list) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return list;
  }

  /**
   * Deletes a task by ID
   * @param id
   */
  deleteTaskByID(id: string): Promise<TaskModel> {
    const temp = this.getTaskByID(id);
    const tempList = this.tasks.filter((task) => task.id != id);
    this.tasks = tempList;
    return temp;
  }

  /**
   * Updates a task status based on the Id
   * @param id
   * @param status
   */
  async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskModel> {
    const temp: TaskModel = await this.getTaskByID(id);
    temp.status = status;
    return temp;
  }

  /**
   * Returns all task
   */
  async getAllTask(): Promise<TaskModel[]> {
    return this.tasks;
  }
}
