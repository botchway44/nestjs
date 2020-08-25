import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { TaskStatus } from '../model/taskstatus';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field((type) => ID, {
    name: 'id',
    description: 'ID of a specific task ',
  })
  id: number | undefined;

  @Column()
  @Field((type) => String, {
    name: 'title',
    description: 'title of a task ',
  })
  title: string | undefined;

  @Column()
  @Field((type) => String, {
    name: 'description',
    description: 'description of a specific task ',
  })
  description: string | undefined;

  @Column()
  @Field((type) => TaskStatus, {
    name: 'status',
    description: 'status of a specific task in any of the 3 states',
  })
  status: TaskStatus | undefined;
}
