import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-http-exception-dialog',
  templateUrl: './http-exception-dialog.component.html',
  styleUrls: ['./http-exception-dialog.component.scss'],
})
export class HttpExceptionDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: HttpExceptionDialogData) {}

  ngOnInit() {}

  public reloadWebapp() {
    location.reload();
  }
}

export interface HttpExceptionDialogData {
  title: string;
  content?: string;
  showReloadButton: boolean;
}
