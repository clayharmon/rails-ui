import express, { Request, Response, Router, Express } from 'express';

const app = express();
app.use(express.json());

const port: number = Number(process.env.PORT) || 8050; // set our port

app.use(express.static('dist'));
app.get('/', (_req: Request, res: Response) => {
  console.log('sending index.html');
  res.sendFile('/dist/index.html');
});

app.listen(port);
console.log(`App listening on ${port}`);
