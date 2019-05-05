enum LogLevel {
  log = 'log',
  error = 'error'
}

export class Logger {

  private static out(level: LogLevel, ...args: any): void {
    /* tslint:disable-next-line:no-console */
    console[level]('[SHEALTH-TRENDS-APP]', '-', new Date(), ':', ...args);
  }

  public static log(...args: any[]): void {
    this.out(LogLevel.log, ...args);
  }

  public static error(...args: any[]): void {
    this.out(LogLevel.error, ...args);
  }
}