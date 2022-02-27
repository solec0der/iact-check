import { LogLevel } from '../model/log-level';

export interface ClientLogEntryDTO {
  logLevel: LogLevel;
  message: string;
  path?: string;
  userAgent?: string;
  remoteIpAddress?: string;
  timestamp?: Date;
}
