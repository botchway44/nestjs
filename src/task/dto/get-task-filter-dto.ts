import { IsOptional, IsIn, isNotEmpty, IsNotEmpty } from 'class-validator';
import { query } from 'express';
import { TaskStatus } from '../model/taskstatus';
import { ApiProperty } from '@nestjs/swagger';

export class SearchFilterDTO {
  @ApiProperty({
    name: 'status',
    description: 'Statsus of the Task ',
    enum: ['OPEN', 'PENDING', 'CLOSED'],
  })
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.PENDING, TaskStatus.CLOSED])
  status: TaskStatus | undefined;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  query: string | undefined;
}
