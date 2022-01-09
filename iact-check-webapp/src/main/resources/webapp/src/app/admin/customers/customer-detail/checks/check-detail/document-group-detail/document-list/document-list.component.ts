import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DocumentGroupDTO } from '../../../../../../../shared/dtos/document-group-dto';
import { SnackBarService } from '../../../../../../../shared/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../../../../../../../shared/services/document.service';
import { ConfirmDialogComponent } from '../../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatTable } from '@angular/material/table';
import { DocumentDTO } from '../../../../../../../shared/dtos/document-dto';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit {
  @Input('documentGroup') public documentGroup!: DocumentGroupDTO;
  @ViewChild('documentsTable') public documentsTable!: MatTable<DocumentDTO>;

  public displayedColumnsDocuments = ['id', 'title', 'mediaType', 'actions'];

  constructor(
    private readonly snackBarService: SnackBarService,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly documentService: DocumentService
  ) {}

  ngOnInit(): void {}

  public deleteDocument(documentId: number): void {
    this.matDialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Sind sie sicher, dass sie dieses Dokument löschen möchten?',
          message: 'Diese Aktion kann nicht rückgängig gemacht werden.',
          buttonTextCancel: 'Nein, nicht löschen',
          buttonTextConfirm: 'Ja, löschen',
        },
      })
      .afterClosed()
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this.documentService.deleteDocumentById(documentId).subscribe(() => {
            this.snackBarService.open('Das Dokument wurde erfolgreich gelöscht.');
            const indexToDelete = this.documentGroup.documents.findIndex((document) => document.id === documentId);
            this.documentGroup.documents.splice(indexToDelete, 1);
            this.documentsTable.renderRows();
          });
        }
      });
  }
}
