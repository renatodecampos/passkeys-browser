type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  level: LogLevel;
  message: string;
  data?: any;
  error?: Error;
}

class Logger {
  private static instance: Logger;
  private isDevelopment: boolean;

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(options: LogOptions): string {
    const timestamp = new Date().toISOString();
    const level = options.level.toUpperCase();
    const message = options.message;
    const data = options.data ? `\nData: ${JSON.stringify(options.data, null, 2)}` : '';
    const error = options.error ? `\nError: ${options.error.message}\nStack: ${options.error.stack}` : '';
    
    return `[${timestamp}] ${level}: ${message}${data}${error}`;
  }

  private log(options: LogOptions): void {
    if (!this.isDevelopment && options.level === 'debug') {
      return;
    }

    const formattedMessage = this.formatMessage(options);

    switch (options.level) {
      case 'debug':
        console.debug(formattedMessage);
        break;
      case 'info':
        console.info(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'error':
        console.error(formattedMessage);
        break;
    }
  }

  public debug(message: string, data?: any): void {
    this.log({ level: 'debug', message, data });
  }

  public info(message: string, data?: any): void {
    this.log({ level: 'info', message, data });
  }

  public warn(message: string, data?: any): void {
    this.log({ level: 'warn', message, data });
  }

  public error(message: string, error?: Error, data?: any): void {
    this.log({ level: 'error', message, error, data });
  }
}

export const logger = Logger.getInstance(); 