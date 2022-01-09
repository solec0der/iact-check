import { Component, OnInit } from '@angular/core';
import { DocumentGroupDTO } from '../../../../../../shared/dtos/document-group-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../../../../../shared/services/customer.service';
import { DocumentService } from '../../../../../../shared/services/document.service';
import { ColourUtility } from '../../../../../../shared/utils/colour.utility';
import { SnackBarService } from '../../../../../../shared/services/snack-bar.service';
import { ConfirmDialogComponent } from '../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-document-group-detail',
  templateUrl: './document-group-detail.component.html',
  styleUrls: ['./document-group-detail.component.scss'],
})
export class DocumentGroupDetailComponent implements OnInit {
  private action = '';
  private checkId = -1;
  private customerId = -1;
  private documentGroupId = -1;

  private _documentGroup!: DocumentGroupDTO;
  private _documentGroupFormGroup!: FormGroup;

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
      this.checkId = Number(params.get('checkId'));
      this.customerId = Number(params.get('customerId'));
      this.documentGroupId = Number(params.get('documentGroupId'));

      if (this.isEditMode()) {
        this.loadData();
      } else {
        this.createDocumentGroupFormGroup();
      }
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);
  }

  public save(): void {
    if (this.isEditMode()) {
      this.updateDocumentGroup();
    } else {
      this.createDocumentGroup();
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

  public deleteDocumentGroup(): void {
    this.matDialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Sind sie sicher, dass sie diese Dokumenten Sammlung löschen möchten?',
          message:
            'Alle Dokumente, die in dieser Sammlung enthalten sind, werden ebenfalls gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.',
          buttonTextCancel: 'Nein, nicht löschen',
          buttonTextConfirm: 'Ja, löschen',
        },
      })
      .afterClosed()
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this.documentService.deleteDocumentGroupById(this.documentGroupId).subscribe(() => {
            this.snackBarService.open('Die Dokumentensammlung wurde erfolgreich gelöscht.');
            this.goBackToCheck();
          });
        }
      });
  }

  private loadData(): void {
    this.documentService.getDocumentGroupById(this.documentGroupId).subscribe((documentGroup) => {
      this._documentGroup = documentGroup;
      this.createDocumentGroupFormGroup();
    });
  }

  private createDocumentGroupFormGroup(): void {
    const backgroundColour = ColourUtility.convertHexToColor(
      this.isEditMode() ? this._documentGroup.backgroundColour : null
    );

    this._documentGroupFormGroup = new FormGroup({
      name: new FormControl(this.isEditMode() ? this._documentGroup.name : '', Validators.required),
      backgroundColour: new FormControl(backgroundColour ? backgroundColour : ''),
    });
  }

  private createDocumentGroup(): void {
    const documentGroupDTO = this.createDocumentGroupDTOFromFormGroup();

    this.documentService.createDocumentGroup(documentGroupDTO).subscribe((createdDocumentGroup) => {
      this.router
        .navigate(['../../', createdDocumentGroup.id, 'edit'], { relativeTo: this.activatedRoute })
        .then(() => {
          this.snackBarService.open('Die Dokumenten Sammlung wurde erfolgreich erstellt.');
        });
    });
  }

  private updateDocumentGroup(): void {
    const documentGroupDTO = this.createDocumentGroupDTOFromFormGroup();

    this.documentService
      .updateDocumentGroupById(this.documentGroupId, documentGroupDTO)
      .subscribe((updateDocumentGroup) => {
        this._documentGroup = updateDocumentGroup;
        this.createDocumentGroupFormGroup();
      });
  }

  private createDocumentGroupDTOFromFormGroup(): DocumentGroupDTO {
    return {
      id: -1,
      checkId: this.checkId,
      name: this._documentGroupFormGroup.value.name,
      backgroundColour: this.documentGroupFormGroup.value.backgroundColour
        ? '#' + this._documentGroupFormGroup.value.backgroundColour.hex
        : '',
      documents: [],
    };
  }

  get documentGroupFormGroup(): FormGroup {
    return this._documentGroupFormGroup;
  }

  get documentGroup(): DocumentGroupDTO {
    return this._documentGroup;
  }
}
