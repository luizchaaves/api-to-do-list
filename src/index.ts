import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use(bodyParser.json());
app.use(routes);

app.listen(3333);
