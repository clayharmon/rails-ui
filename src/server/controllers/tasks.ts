import { WebSocket } from 'ws';
import { execute, executeSync } from '../utils/execute';
import { parseRailsTask } from '../utils/parseRailsTask';

export const getTasks = async (cwd: string) => {
  const command = 'rails --tasks';
  const { status, stdout, stderr } = executeSync(command, cwd);
  if (status) throw stderr.toString();

  return stdout
    .toString()
    .split('\n')
    .map((task) => parseRailsTask(task));
};

export const postTask = async (task: string, cwd: string, ws: WebSocket) => {
  const rt = execute(`rails ${task}`, cwd);
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
