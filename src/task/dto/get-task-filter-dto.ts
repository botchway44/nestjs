import { IsOptional, IsIn, isNotEmpty, IsNotEmpty } from 'class-validator';
import { query } from 'express';
import { TaskStatus } from '../model/taskstatus';

export class SearchFilterDTO {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.PENDING, TaskStatus.CLOSED])
  status: TaskStatus | undefined;

  @IsOptional()
  @IsNotEmpty()
  query: string | undefined;
}
