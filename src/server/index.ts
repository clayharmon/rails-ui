import express, { Request, Response } from 'express';
import { getTasks } from './controllers/tasks';
import { spawn, IPty } from 'node-pty';
import expressWs from 'express-ws';
import { WebSocket } from 'ws';
import { bufferedSend } from './utils/bufferedSend';

interface Terminals {
  [key: number]: IPty;
}
interface Logs {
  [key: number]: string;
}

interface Env {
  [key: string]: string;
}

const appBase = express();
const { app } = expressWs(appBase);
const port: number = Number(process.env.PORT) || 8050;
const terminals: Terminals = {};
const logs: Logs = {};

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

app.post(
  '/api/v1/actions/tasks/terminal/',
  async (_req: Request, res: Response) => {
    const { env } = process;
    const shell = env.SHELL || 'bash';
    env['COLORTERM'] = 'truecolor';
    const term = spawn(shell, [], {
      name: 'xterm-256color',
      cols: 80,
      rows: 24,
      cwd: env.PWD,
      env: env as Env,
      encoding: 'utf8'
    });

    console.log('Created terminal with PID: ' + term.pid);
    terminals[term.pid] = term;
    logs[term.pid] = '';
    term.onData((data) => {
      logs[term.pid] += data;
    });
    res.send(term.pid.toString());
    res.end();
  }
);
app.ws('/terminals/:pid', (ws: WebSocket, req: Request) => {
  const term = terminals[parseInt(req.params.pid)];
  console.log('Connected to terminal ' + term.pid);
  ws.send(logs[term.pid]);

  const send = bufferedSend(ws, 5);

  term.onData((data) => {
    try {
      send(data);
    } catch (ex) {
      // The WebSocket is not open, ignore
    }
  });
  ws.on('message', (msg) => {
    term.write(msg.toString());
  });
  ws.on('close', () => {
    term.kill();
    console.log('Closed terminal ' + term.pid);

    delete terminals[term.pid];
    delete logs[term.pid];
  });
});

app.listen(port);
console.log(`App listening on ${port}`);
