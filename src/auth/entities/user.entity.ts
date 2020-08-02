import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity('User')
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  public async validatePassword(password: string): Promise<boolean> {
    const hash = bcrypt.hash(password, this.salt);

    return hash === password;
  }
}
