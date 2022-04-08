#!/usr/bin/env node

/**
 * Module dependencies.
 */

import 'colors';
import app from '../app';
import { emoji } from 'node-emoji';
import open from 'open';

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '8050');
app.set('port', port);

app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(emoji.diamonds, ' Opening server at:'.white, url.red.underline);
  open(url);
});
