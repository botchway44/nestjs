import { SearchFilterDTO } from '../dto/get-task-filter-dto';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { TaskStatus } from '../model/taskstatus';

export interface TaskServiceModel<T, A> {
  /**
   * Returns an array of tasks based on a filter
   * @param queryParams
   */
  searchByFilter(queryParams: SearchFilterDTO): Promise<T[]>;

  /**
   * Adds a task to the task List
   * @param createTaskDto
   */
  addTask(createTaskDto: CreateTaskDTO): Promise<T>;

  /**
   * Gets a task by Id
   * @param id
   */
  getTaskByID(id: A): Promise<T>;

  /**
   * Deletes a task by ID
   * @param id
   */
  deleteTaskByID(id: A): Promise<T>;

  /**
   * Updates a task status based on the Id
   * @param id
   * @param status
   */
  updateTaskStatus(id?: A, status?: TaskStatus): Promise<T>;

  /**
   * Returns all task
   */
  getAllTask(): Promise<T[]>;
}
