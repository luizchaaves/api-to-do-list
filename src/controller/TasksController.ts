import { AppDataSource } from '../data-source';
import { Tasks } from '../entity/Tasks';
import { Request, Response } from 'express';

export const getTasks = async (resquest: Request, response: Response) => {
  const tasks = await AppDataSource.getRepository(Tasks).find();
  return response.json(tasks);
};

export const saveTask = async (request: Request, response: Response) => {
  const task = await AppDataSource.getRepository(Tasks).save(request.body);
  return response.json(task);
};
