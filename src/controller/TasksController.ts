import { AppDataSource } from '../data-source';
import { Tasks } from '../entity/Tasks';
import { Request, Response } from 'express';

export const getTasks = async (resquest: Request, response: Response) => {
  const tasks = await AppDataSource.getRepository(Tasks).find();
  if (tasks) {
    return response.json(tasks);
  }
  return response.status(404).json({ message: 'Nenhuma tarefa cadastrada' });
};

export const getTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = await AppDataSource.getRepository(Tasks).findOne({
    where: { id },
  });
  if (task) {
    return response.json(task);
  }
  return response.status(404).json({ message: 'Tarefa não encontrada' });
};

export const createTask = async (request: Request, response: Response) => {
  const task = await AppDataSource.getRepository(Tasks).save(request.body);
  return response.json({ task, message: 'Tarefa criada com sucesso' });
};

export const updateTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = await AppDataSource.getRepository(Tasks).update(
    id,
    request.body
  );
  if (task.affected === 1) {
    const taskUpdated = await AppDataSource.getRepository(Tasks).findOne({
      where: { id },
    });
    return response.json(taskUpdated);
  }
  return response.status(404).json({ message: 'Tarefa não encontrada' });
};

export const finishedTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = await AppDataSource.getRepository(Tasks).update(id, {
    finished: true,
  });
  if (task.affected === 1) {
    const taskUpdated = await AppDataSource.getRepository(Tasks).findOne({
      where: { id },
    });
    return response.json({ message: 'Tarefa finalizada com sucesso' });
  }
  return response.status(404).json({ message: 'Tarefa não encontrada' });
};

export const removeTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = await AppDataSource.getRepository(Tasks).delete(id);
  if (task.affected === 1) {
    const taskUpdated = await AppDataSource.getRepository(Tasks).findOne({
      where: { id },
    });
    return response.json({ message: 'Tarefa apagada com sucesso' });
  }
  return response.status(404).json({ message: 'Tarefa não encontrada' });
};
