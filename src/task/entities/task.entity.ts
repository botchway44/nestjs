import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { TaskStatus } from '../model/taskstatus';
import { User } from 'src/auth/entities/user.entity';

import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Task extends BaseEntity {
  @ApiProperty({
    name: 'id',
    description: 'id of the Task ',
  })
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @ApiProperty({
    name: 'title',
    description: 'title of the Task ',
  })
  @Column()
  title: string | undefined;

  @ApiProperty({
    name: 'description',
    description: 'description of the Task ',
  })
  @Column()
  description: string | undefined;

  @ApiProperty({
    name: 'status',
    description: 'Statsus of the Task ',
    enum: ['OPEN', 'PENDING', 'CLOSED'],
  })
  @Column()
  status: TaskStatus | undefined;

  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  user: User;

  @Column()
  userId: number;
}
