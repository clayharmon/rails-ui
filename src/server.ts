import { spawnSync, spawn } from 'child_process';
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const LOGIN_SHELL = process.env.SHELL;

const parseRailsTask = (railsTask: string) => {
  const groups = /rails ([^\s]+).*#  # (.*)/.exec(railsTask);
  const task = !groups ? 'no task' : groups[1];
  const description = !groups ? 'no description' : groups[2];
  return { task, description };
};

const execCommandSync = (command: string, cwd: string) => {
  return spawnSync(LOGIN_SHELL, ['-l', '-c', command], {
    cwd
  });
};

const execCommand = (command: string, cwd: string) => {
  return spawn(LOGIN_SHELL, ['-l', '-c', command], {
    cwd
  });
};

const getTasks = async (cwd: string) => {
  const command = 'rails --tasks';
  const { status, stdout, stderr } = execCommandSync(command, cwd);
  if (status) throw stderr.toString();

  return stdout
    .toString()
    .split('\n')
    .map((task) => parseRailsTask(task));
};

const postTask = async (task: string, cwd: string, ws: WebSocket) => {
  const rt = execCommand(`rails ${task}`, cwd);
  rt.stdout.on('data', (data) => {
    ws.send(data.toString());
  });
  rt.stderr.on('data', (data) => {
    ws.send(data.toString());
  });
  rt.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
  });

  rt.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

const loadProject = async (cwd: string, ws: WebSocket) => {
  try {
    // const tasks = await getTasks(cwd);
    ws.on('message', async (data) => {
      console.log('received: %s', data);
      await postTask(data.toString(), cwd, ws);
    });
  } catch (err) {
    console.log(err);
  }
};

wss.on('connection', function connection(ws) {
  ws.send('started');
  loadProject('/Users/clay.harmon/Development/apm_bundle/apps/property/', ws);
});
