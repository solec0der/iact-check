import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientLogEntryDTO } from '../../../shared/dtos/client-log-entry-dto';

@Component({
  selector: 'app-client-logs-detail',
  templateUrl: './client-logs-detail.component.html',
  styleUrls: ['./client-logs-detail.component.scss'],
})
export class ClientLogsDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ClientLogEntryDTO) {}

  ngOnInit(): void {}
}
