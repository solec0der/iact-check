import { Component, OnInit } from '@angular/core';
import { DocumentGroupService } from '../../../../../../shared/services/document-group.service';
import { ActivatedRoute } from '@angular/router';
import { DocumentGroupDTO } from '../../../../../../shared/dtos/document-group-dto';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { SnackBarService } from '../../../../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-document-group-list',
  templateUrl: './document-group-list.component.html',
  styleUrls: ['./document-group-list.component.scss'],
})
export class DocumentGroupListComponent implements OnInit {
  private checkId!: number;
  private _documentGroups!: DocumentGroupDTO[];

  public displayedColumnsDocumentGroups = ['id', 'name', 'backgroundColour', 'actions'];

  constructor(
    private readonly snackBarService: SnackBarService,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly documentGroupService: DocumentGroupService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.checkId = Number(params.get('checkId'));
      this.loadData();
    });
  }

  ngOnInit(): void {}

  public deleteDocumentGroupById(documentGroupId: number): void {
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
          this.documentGroupService.deleteDocumentGroupById(documentGroupId).subscribe(() => {
            this.snackBarService.open('Die Dokumentensammlung wurde erfolgreich gelöscht.');
            this.loadData();
          });
        }
      });
  }

  private loadData(): void {
    this.documentGroupService.getDocumentGroupsByCheckId(this.checkId).subscribe((documentGroups) => {
      this._documentGroups = documentGroups;
    });
  }

  get documentGroups(): DocumentGroupDTO[] {
    return this._documentGroups;
  }
}
