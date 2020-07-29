import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';

export const typeORMOptions: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'TaskManagement',
  username: 'postgres',
  password: 'postgress',
  // entities: [__dirname + 'src/**/**/**.entity.{ts,js}'], //Had problems
  entities: [Task],
  synchronize: true,
  keepConnectionAlive: true,
};
