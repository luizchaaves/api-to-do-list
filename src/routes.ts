import { Router, Request, Response } from 'express';
import { getTasks, saveTask } from './controller/TasksController';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello world' });
});

routes.get('/tasks', getTasks);
routes.post('/tasks', saveTask);

export default routes;
