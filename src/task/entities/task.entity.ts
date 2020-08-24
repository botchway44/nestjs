import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { TaskStatus } from '../model/taskstatus';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number | undefined;

  @Column()
  @Field((type) => String)
  title: string | undefined;

  @Column()
  @Field((type) => String)
  description: string | undefined;

  @Column()
  @Field((type) => TaskStatus)
  status: TaskStatus | undefined;
}
