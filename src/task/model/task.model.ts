import { TaskStatus } from './taskstatus';

export interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
