class Log {
  pid: number;
  buffer: string;

  constructor(pid: number) {
    this.pid = pid;
    this.buffer = '';
  }

  append(data: string) {
    this.buffer += data;
  }
}

export default Log;
