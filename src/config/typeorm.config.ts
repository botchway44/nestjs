import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/auth/entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const typeORMOptions: TypeOrmModuleOptions = {
  url: process.env.DATABASE_URL,
  name: 'default',
  type: 'postgres',
  // host: process.env.HOST,
  // port: 5432,
  // database: process.env.DATABASE,
  // username: process.env.USER,
  // password: process.env.PASSWORD,
  // entities: [__dirname + '../**/**/*.entity.{ts,js}'], //Had problems
  entities: [Task, User],
  synchronize: true,
  keepConnectionAlive: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
