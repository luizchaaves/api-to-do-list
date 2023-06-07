import { Router, Request, Response } from 'express';
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  finishedTask,
  removeTask,
  finishedTasks,
  openedTasks,
  countTasks,
} from './controller/TasksController';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello world' });
});

routes.get('/tasks', getTasks);
routes.get('/tasks/:id', getTask);
routes.get('/openedTasks', openedTasks);
routes.get('/finishedTasks', finishedTasks);
routes.get('/countTasks', countTasks);
routes.post('/tasks', createTask);
routes.put('/tasks/:id', updateTask);
routes.patch('/tasks/:id', finishedTask);
routes.delete('/tasks/:id', removeTask);

export default routes;
