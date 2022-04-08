import { spawn, IPtyForkOptions, IPty } from 'node-pty';
import { RawData } from 'ws';
import Log from './Log';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TerminalEvent = (e: string) => any;
type Env = { [key: string]: string };

class Terminal {
  term: IPty;
  pid: number;
  logStore: Log;

  private env: Env;
  private defaultOptions: IPtyForkOptions;

  constructor(options?: IPtyForkOptions) {
    this.env = process.env as Env;
    this.defaultOptions = {
      name: 'xterm-256color',
      cols: 80,
      rows: 24,
      cwd: '/Users/clay.harmon/Development/apm_bundle/apps/property/',
      env: this.env,
      encoding: 'utf8'
    };
    this.term = spawn(this.env.SHELL || 'bash', [], {
      ...this.defaultOptions,
      ...options
    });
    this.pid = this.term.pid;
    this.logStore = new Log(this.pid);
  }

  write(message: string | RawData) {
    const utf8Message = message.toString();
    this.term.write(utf8Message);
  }

  onData(listener: TerminalEvent) {
    this.term.onData(listener);
  }

  logData() {
    this.term.onData((data) => this.logStore.append(data));
  }

  log() {
    return this.logStore.buffer;
  }
}

export default Terminal;
