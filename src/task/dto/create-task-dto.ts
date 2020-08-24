import { isNotEmpty, IsNotEmpty } from 'class-validator';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskDTO {
  @Field((type) => String)
  @IsNotEmpty()
  title: string;

  @Field((type) => String)
  @IsNotEmpty()
  description: string;
}
