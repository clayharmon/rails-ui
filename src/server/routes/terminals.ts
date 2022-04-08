import { Router, RequestHandler, Request } from 'express';
import { WebSocket } from 'ws';
import terminalStore from '../stores/Terminals';
import { bufferedSend } from '../utils/bufferedSend';

const createTerminalRoute: RequestHandler = (_req, res) => {
  const term = terminalStore.new();
  console.log('Created terminal with PID: ' + term.pid);
  term.logData();
  res.send(term.pid.toString());
  res.end();
};

const wsTerminalroute = async (ws: WebSocket, req: Request) => {
  const pid = parseInt(req.params.pid, 10);
  const term = terminalStore.getByPid(pid);
  console.log('Connected to terminal ' + term.pid);
  ws.send(term.log());

  const send = bufferedSend(ws, 5);

  term.onData((data) => send(data));
  ws.on('message', (msg) => term.write(msg));
  ws.on('close', () => {
    terminalStore.killByPid(pid);
    console.log('Closed terminal ' + pid);
  });
};

const terminalRouter = Router();
terminalRouter.post('/', createTerminalRoute);
terminalRouter.ws('/:pid', wsTerminalroute);

export default terminalRouter;
