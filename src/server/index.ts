import express, { Request, Response, Router, Express } from 'express';
import { getTasks } from './controllers/tasks';

const app = express();
app.use(express.json());

const port: number = Number(process.env.PORT) || 8050; // set our port

app.use(express.static('dist/client'));
app.get('/', (_req: Request, res: Response) => {
  console.log('sending index.html');
  res.sendFile('/dist/client/index.html');
});

app.use(express.json());
app.get('/api/v1/actions/tasks', async (_req: Request, res: Response) => {
  const tasks = await getTasks(
    '/Users/clay.harmon/Development/apm_bundle/apps/property/'
  );
  res.send(tasks);
});

app.listen(port);
console.log(`App listening on ${port}`);
