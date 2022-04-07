import { WebSocket } from 'ws';

export const bufferedSend = (socket: WebSocket, timeout: number) => {
  let s = '';
  let timeoutId: null | ReturnType<typeof setTimeout> = null;
  return (data: string) => {
    s += data;
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        socket.send(s);
        s = '';
        timeoutId = null;
      }, timeout);
    }
  };
};
