import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientLogEntryDTO } from '../dtos/client-log-entry-dto';
import { Observable } from 'rxjs';
import { CORE_URL } from '../../app.config';
import { LogLevel } from '../model/log-level';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private readonly http: HttpClient) {}

  public createClientLogEntry(clientLogEntry: ClientLogEntryDTO): Observable<void> {
    const body = JSON.stringify(clientLogEntry);

    return this.http.post<void>(`${CORE_URL}/api/logs/client-logs`, body);
  }

  public getClientLogs(page: number, pageSize: number, logLevels: LogLevel[]): Observable<ClientLogEntryDTO[]> {
    return this.http.get<ClientLogEntryDTO[]>(
      `${CORE_URL}/api/admin/logs/client-logs?page=${page}&page-size=${pageSize}&log-levels=${logLevels.join(',')}`
    );
  }

  public getNumberOfClientLogs(logLevels: LogLevel[]): Observable<number> {
    return this.http.get<number>(`${CORE_URL}/api/admin/logs/client-logs/count?log-levels=${logLevels.join(',')}`);
  }
}
