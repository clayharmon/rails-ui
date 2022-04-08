import { RequestHandler, Router } from 'express';
import { getTasks } from '../../controllers/tasks';

const getTasksRoute: RequestHandler = async (_req, res, next) => {
  try {
    const tasks = await getTasks(
      '/Users/clay.harmon/Development/apm_bundle/apps/property/'
    );
    res.send(tasks);
  } catch (err) {
    next(err);
  }
};

const taskRouter = Router();

taskRouter.get('/', getTasksRoute);

export default taskRouter;
