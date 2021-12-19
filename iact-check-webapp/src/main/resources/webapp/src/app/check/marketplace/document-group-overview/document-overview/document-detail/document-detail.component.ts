import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentDTO } from '../../../../../shared/dtos/document-dto';
import { CORE_URL } from '../../../../../app.config';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
})
export class DocumentDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public document: DocumentDTO) {}

  ngOnInit(): void {}

  public getFileUrl(): string {
    return `${CORE_URL}/api/documents/${this.document.id}/file`;
  }
}
