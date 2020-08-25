import { isNotEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskDTO {
  @Field((type) => String)
  @ApiProperty({
    name: 'title',
    description: 'Title of the Task',
    type: 'string',
  })
  @IsNotEmpty()
  title: string;

  @Field((type) => String)
  @ApiProperty({
    name: 'description',
    description: 'Desciption of the task',
    type: 'string',
  })
  @IsNotEmpty()
  description: string;
}
