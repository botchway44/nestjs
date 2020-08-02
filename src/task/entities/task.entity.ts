import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from 'typeorm';
import { TaskStatus } from '../model/taskstatus';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  title: string | undefined;

  @Column()
  description: string | undefined;

  @Column()
  status: TaskStatus | undefined;
}
