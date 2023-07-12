import { AppDataSource } from '../data-source';
import { Tasks } from '../entity/Tasks';
import { Request, Response } from 'express';

export const getTasks = async (resquest: Request, response: Response) => {
  const tasks = await AppDataSource.getRepository(Tasks)
    .createQueryBuilder('tasks')
    .orderBy('tasks.created_at', 'DESC')
    .getMany();
  if (tasks) {
    return response.json({ tasks, length: tasks.length });
  }
  return response.status(404).json({ message: 'Nenhuma tarefa cadastrada' });
};

export const getTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = await AppDataSource.getRepository(Tasks).findOne({
    text: 'SELECT * FROM tasks WHERE id = $1',
    values: [id],
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
  const repository = AppDataSource.getRepository(Tasks);
  const task = await repository.findOne({
    where: { id },
  });

  if (task) {
    task.finished = !task.finished;
    await repository.save(task);
    return response.json({ message: 'Status da tarefa alterado com sucesso' });
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

export const finishedTasks = async (resquest: Request, response: Response) => {
  const tasks = await AppDataSource.getRepository(Tasks).find({
    where: { finished: true },
  });
  if (tasks) {
    return response.json({ tasks, length: tasks.length });
  }
  return response.status(404).json({ message: 'Nenhuma tarefa finalizada' });
};

export const openedTasks = async (resquest: Request, response: Response) => {
  const tasks = await AppDataSource.getRepository(Tasks).find({
    where: { finished: false },
  });
  if (tasks) {
    return response.json({ tasks, length: tasks.length });
  }
  return response.status(404).json({ message: 'Nenhuma tarefa finalizada' });
};

export const countTasks = async (request: Request, response: Response) => {
  const countAllTasks = await AppDataSource.getRepository(Tasks).count();
  const countOpenedTasks = await AppDataSource.getRepository(Tasks).count({
    where: { finished: false },
  });
  const countFinishedTasks = await AppDataSource.getRepository(Tasks).count({
    where: { finished: true },
  });
  return response.json({
    AllTasks: countAllTasks,
    OpenedTasks: countOpenedTasks,
    FinishedTasks: countFinishedTasks,
  });
};
