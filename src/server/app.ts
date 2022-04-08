import express, {
  ErrorRequestHandler,
  Request,
  Response,
  Router
} from 'express';
import createError from 'http-errors';
import expressWs from 'express-ws';

const app = express();
expressWs(app);

import actionRouter from './routes/actions';
import terminalRouter from './routes/terminals';

app.use(express.static('dist/client'));
app.get('/', (_req: Request, res: Response) => {
  console.log('sending index.html');
  res.sendFile('/dist/client/index.html');
});

app.use(express.json());

const apiV1 = Router();

apiV1.use('/actions', actionRouter);
apiV1.use('/terminals', terminalRouter);

app.use('/api/v1/', apiV1);

app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
const errorHanlder: ErrorRequestHandler = (err, _req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
};
app.use(errorHanlder);

export default app;
