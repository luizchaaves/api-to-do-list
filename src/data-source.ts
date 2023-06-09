import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Tasks } from './entity/Tasks';
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: 'db_todo_3ei8_user',
  password: process.env.DB_PASSWORD,
  database: 'db_todo_3ei8',
  synchronize: true,
  logging: false,
  entities: [Tasks],
  migrations: [],
  subscribers: [],
  ssl: true,
  extra: {
    ssl: { rejectUnauthorized: false },
  },
});
