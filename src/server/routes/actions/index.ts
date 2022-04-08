import { Router } from 'express';
import taskRouter from './tasks';

const actionRouter = Router();
actionRouter.use('/tasks/', taskRouter);

export default actionRouter;
