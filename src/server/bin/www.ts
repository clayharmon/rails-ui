#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from 'http';
import 'colors';
import app from '../app';

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

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `${addr}` : `${addr?.port}`;
  console.log(
    'Server started:'.white,
    `http://localhost:${bind}`.blue.underline
  );
};
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
