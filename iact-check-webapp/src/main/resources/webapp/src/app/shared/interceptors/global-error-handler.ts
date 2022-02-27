import { ErrorHandler, Injectable } from '@angular/core';
import { LogService } from '../services/log.service';
import { ClientLogEntryDTO } from '../dtos/client-log-entry-dto';
import { LogLevel } from '../model/log-level';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly logService: LogService) {}

  handleError(error: Error) {
    const clientLogEntry: ClientLogEntryDTO = {
      logLevel: LogLevel.ERROR,
      message: error.message,
      path: location.href,
    };

    this.logService.createClientLogEntry(clientLogEntry).subscribe(() => {});

    console.error(error);
  }
}
