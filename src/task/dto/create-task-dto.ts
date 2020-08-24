import { isNotEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
  @ApiProperty({
    name: 'title',
    description: 'Title of the Task',
    type: 'string',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'description',
    description: 'Desciption of the task',
    type: 'string',
  })
  @IsNotEmpty()
  description: string;
}
