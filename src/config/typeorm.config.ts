import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/auth/entities/user.entity';

export const typeORMOptions: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'TaskManagement',
  username: 'postgres',
  password: 'postgress',
  // entities: [__dirname + '../**/**/*.entity.{ts,js}'], //Had problems
  entities: [Task, User],
  synchronize: true,
  keepConnectionAlive: true,
};
