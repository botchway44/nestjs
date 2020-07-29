import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { TaskStatus } from '../model/taskstatus';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  title: string | undefined;

  @Column()
  description: string | undefined;

  @Column()
  status: TaskStatus | undefined;
}
