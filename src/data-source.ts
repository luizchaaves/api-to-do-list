import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Tasks } from './entity/Tasks';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'db_todo',
  synchronize: true,
  logging: false,
  entities: [Tasks],
  migrations: [],
  subscribers: [],
});
