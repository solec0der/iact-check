import { Component, OnInit } from '@angular/core';
import { LogService } from '../../../shared/services/log.service';
import { ClientLogEntryDTO } from '../../../shared/dtos/client-log-entry-dto';
import { LogLevel } from '../../../shared/model/log-level';
import { MatDialog } from '@angular/material/dialog';
import { ClientLogsDetailComponent } from '../client-logs-detail/client-logs-detail.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-client-logs-list',
  templateUrl: './client-logs-list.component.html',
  styleUrls: ['./client-logs-list.component.scss'],
})
export class ClientLogsListComponent implements OnInit {
  public displayedColumnsClientLogs = ['logLevel', 'remoteIpAddress', 'message', 'timestamp', 'actions'];
  private _clientLogEntries!: ClientLogEntryDTO[];

  public logLevelKeys = Object.keys(LogLevel);

  public page = 0;
  public pageSize = 10;
  public numberOfClientLogs = 0;
  public logLevels = [LogLevel.INFO, LogLevel.ERROR, LogLevel.DEBUG];

  constructor(private readonly logService: LogService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  public showClientErrorLogsDetailComponent(clientLogEntry: ClientLogEntryDTO): void {
    this.dialog.open(ClientLogsDetailComponent, {
      data: clientLogEntry,
    });
  }

  public changePage(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.page = pageEvent.pageIndex;
    this.loadData();
  }

  public changeLogLevels(): void {
    this.loadData();
  }

  public loadData(): void {
    this.logService.getNumberOfClientLogs(this.logLevels).subscribe((numberOfClientLogs) => {
      this.numberOfClientLogs = numberOfClientLogs;
    });

    this.logService.getClientLogs(this.page, this.pageSize, this.logLevels).subscribe((clientLogEntries) => {
      this._clientLogEntries = clientLogEntries;
    });
  }

  get clientLogEntries(): ClientLogEntryDTO[] {
    return this._clientLogEntries;
  }
}
