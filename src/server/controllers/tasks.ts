import { executeSync } from '../utils/execute';
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
