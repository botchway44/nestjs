import { SearchFilterDTO } from '../dto/get-task-filter-dto';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { TaskStatus } from '../model/taskstatus';

export interface TaskServiceModel {
  /**
   * Returns an array of tasks based on a filter
   * @param queryParams
   */
  searchByFilter(queryParams: SearchFilterDTO);

  /**
   * Adds a task to the task List
   * @param createTaskDto
   */
  addTask(createTaskDto: CreateTaskDTO);

  /**
   * Gets a task by Id
   * @param id
   */
  getTaskByID(id: string);

  /**
   * Deletes a task by ID
   * @param id
   */
  deleteTaskByID(id: string);

  /**
   * Updates a task status based on the Id
   * @param id
   * @param status
   */
  updateTaskStatus(id: string, status: TaskStatus);
  /**
   * Returns all task
   */
  getAllTask();
}
