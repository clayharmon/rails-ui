import { spawnSync, spawn } from 'child_process';
const LOGIN_SHELL = process.env.SHELL || '/bin/bash';

export const executeSync = (command: string, cwd: string) => {
  return spawnSync(LOGIN_SHELL, ['-l', '-c', command], {
    cwd
  });
};

export const execute = (command: string, cwd: string) => {
  return spawn(LOGIN_SHELL, ['-l', '-c', command], {
    cwd
  });
};
