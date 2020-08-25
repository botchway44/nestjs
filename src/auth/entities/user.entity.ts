import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/task/entities/task.entity';
import { type } from 'os';
import { ObjectType, Field } from '@nestjs/graphql';
@Entity('User')
@Unique(['username'])
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  public async validatePassword(password: string): Promise<boolean> {
    const hash = bcrypt.hash(password, this.salt);

    return hash === password;
  }
}
