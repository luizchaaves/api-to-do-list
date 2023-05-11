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
} from './controller/TasksController';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello world' });
});

routes.get('/tasks', getTasks);
routes.get('/tasks/:id', getTask);
routes.post('/tasks', createTask);
routes.put('/tasks/:id', updateTask);
routes.patch('/tasks/:id', finishedTask);
routes.delete('/tasks/:id', removeTask);
routes.get('/finishedTasks', finishedTasks);
routes.get('/openedTasks', openedTasks);

export default routes;
