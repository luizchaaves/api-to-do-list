import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Tasks } from './entity/Tasks';
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
