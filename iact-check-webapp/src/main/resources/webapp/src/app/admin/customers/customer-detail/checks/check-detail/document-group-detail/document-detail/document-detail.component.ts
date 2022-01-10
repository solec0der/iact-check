import { Component, OnInit } from '@angular/core';
import { DocumentDTO } from '../../../../../../../shared/dtos/document-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../../../../shared/services/snack-bar.service';
import { CustomerService } from '../../../../../../../shared/services/customer.service';
import { DocumentService } from '../../../../../../../shared/services/document.service';
import { map, mergeMap } from 'rxjs/operators';
import { FileReaderUtil } from '../../../../../../shared/util/file-reader.util';
import { mimeTypes } from 'mime-wrapper';
import { CORE_URL } from '../../../../../../../app.config';
import { ConfirmDialogComponent } from '../../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { FileValidator } from "../../../../../../../shared/validators/file-validator";

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
})
export class DocumentDetailComponent implements OnInit {
  private action = '';
  private documentId = -1;
  private documentGroupId = -1;
  private customerId = -1;

  private _document!: DocumentDTO;
  private _documentFormGroup!: FormGroup;

  private _file!: File;

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly snackBarService: SnackBarService,
    private readonly customerService: CustomerService,
    private readonly documentService: DocumentService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.action = String(params.get('action'));
      this.customerId = Number(params.get('customerId'));
      this.documentId = Number(params.get('documentId'));
      this.documentGroupId = Number(params.get('documentGroupId'));

      if (this.isEditMode()) {
        this.loadData();
      } else {
        this.createDocumentFormGroup();
      }
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);
  }

  public save(): void {
    if (this.isEditMode()) {
      this.updateDocument();
    } else {
      this.createDocument();
    }
  }

  public isEditMode(): boolean {
    return this.action === 'edit';
  }

  public goBackToCheck(): void {
    this.router
      .navigate(['../../../edit'], {
        relativeTo: this.activatedRoute,
      })
      .then();
  }

  public showFile(): void {
    window.open(CORE_URL + '/api/documents/' + this.documentId + '/file', '_blank');
  }

  public deleteDocument(): void {
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
          this.documentService.deleteDocumentById(this.documentId).subscribe(() => {
            this.snackBarService.open('Das Dokument wurde erfolgreich gelöscht.');
            this.goBackToCheck();
          });
        }
      });
  }

  private loadData(): void {
    this.documentService
      .getDocumentById(this.documentId)
      .pipe(
        map((documentDTO) => {
          this._document = documentDTO;
          return documentDTO;
        }),
        mergeMap((documentDTO) => {
          return this.documentService.getFileByDocumentId(documentDTO.id);
        })
      )
      .subscribe((file) => {
        this._file = FileReaderUtil.convertBlobToFile(
          file,
          this._document.title + '.' + mimeTypes.getExtension(this.document.mediaType)
        );
        this.createDocumentFormGroup();
      });
  }

  private createDocumentFormGroup(): void {
    this._documentFormGroup = new FormGroup({
      title: new FormControl(this.isEditMode() ? this._document.title : '', Validators.required),
      file: new FormControl(this._file && this._file.size > 0 ? this._file : new File([], ''), [Validators.required, FileValidator.maxFileSize(30)]),
    });
  }

  private createDocument(): void {
    const documentDTO = this.createDocumentDTOFromFormGroup();

    this.documentService
      .createDocumentForDocumentGroup(this.documentGroupId, documentDTO)
      .pipe(
        map((createdDocument) => {
          this._document = createdDocument;
          return createdDocument;
        }),
        mergeMap((createdDocument) => {
          return this.documentService.uploadFileForDocument(createdDocument.id, this.documentFormGroup.value.file);
        })
      )
      .subscribe(() => {
        this.router.navigate(['../../', this.document.id, 'edit'], { relativeTo: this.activatedRoute }).then(() => {
          this.snackBarService.open('Das Dokument wurde erfolgreich erstellt');
        });
      });
  }

  private updateDocument(): void {
    const documentDTO = this.createDocumentDTOFromFormGroup();

    this.documentService
      .updateDocumentById(this.documentId, documentDTO)
      .pipe(
        map((updatedDocument) => {
          this._document = updatedDocument;
          return updatedDocument;
        }),
        mergeMap((updatedDocument) => {
          return this.documentService.uploadFileForDocument(updatedDocument.id, this.documentFormGroup.value.file);
        })
      )
      .subscribe(() => {
        this.snackBarService.open('Das Dokument wurde erfolgreich gespeichert.');
        this.createDocumentFormGroup();
      });
  }

  private createDocumentDTOFromFormGroup(): DocumentDTO {
    return {
      id: -1,
      title: this.documentFormGroup.value.title,
      position: this._document ? this._document.position : -1,
      mediaType: this.documentFormGroup.value.file.type,
    };
  }

  get document(): DocumentDTO {
    return this._document;
  }

  get documentFormGroup(): FormGroup {
    return this._documentFormGroup;
  }

  get file(): File {
    return this._file;
  }
}
