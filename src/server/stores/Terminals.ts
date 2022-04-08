import { IPtyForkOptions } from 'node-pty';
import Terminal from '../models/Terminal';

interface TerminalsStore {
  [key: number]: Terminal;
}

export class Terminals {
  terminals: TerminalsStore;

  constructor() {
    this.terminals = {};
  }

  new(options?: IPtyForkOptions) {
    const term = new Terminal(options);
    this.terminals[term.pid] = term;
    return term;
  }

  getByPid(pid: number) {
    return this.terminals[pid];
  }

  killByPid(pid: number) {
    this.terminals[pid].term.kill();
    delete this.terminals[pid];
  }
}

export default new Terminals();
