const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import routes from './routes';
import { AppDataSource } from './data-source';
import { Tasks } from './entity/Tasks';
import * as cron from 'node-cron';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

AppDataSource.initialize()
  .then(() => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(routes);

    server.listen(port);

    cron.schedule('*/10 * * * *', async () => {
      const repository = AppDataSource.getRepository(Tasks);
      const count = await repository.count();
      if (count > 0) {
        await AppDataSource.getRepository(Tasks).clear();
        io.emit('clearTasks');
      }
    });
  })
  .catch((error) => console.log(error));
