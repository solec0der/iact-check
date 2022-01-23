import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentGroupDTO } from '../../../../shared/dtos/document-group-dto';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DocumentDTO } from '../../../../shared/dtos/document-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-search-dialog',
  templateUrl: './document-search-dialog.component.html',
  styleUrls: ['./document-search-dialog.component.scss'],
})
export class DocumentSearchDialogComponent implements OnInit {
  public documentsTableColumnName = '';
  private _filteredDocumentGroups!: Observable<DocumentGroupDTO[]>;
  private _filterFormGroup = new FormGroup({
    filterString: new FormControl('', Validators.required),
  });
  private _selectedDocument!: DocumentDTO;

  constructor(
    @Inject(MAT_DIALOG_DATA) private documentGroups: DocumentGroupDTO[],
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialogRef: MatDialogRef<DocumentSearchDialogComponent>
  ) {
    this.activatedRoute.queryParamMap.subscribe((queryParamsMap) => {
      this.documentsTableColumnName = String(queryParamsMap.get('documentsTableColumnName'));
    });
  }

  ngOnInit(): void {
    this._filteredDocumentGroups = this._filterFormGroup.get('filterString')!.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterDocumentGroups(value))
    );
  }

  public setSelectedDocument(id: string): void {
    const documentId = Number(id);

    const document = this.documentGroups
      .map((documentGroup) => documentGroup.documents)
      .reduce((accumulator, value) => accumulator.concat(value), [])
      .find((document) => document.id === documentId);

    if (document) {
      this._selectedDocument = document;
    }
  }

  public openSelectedDocument(): void {
    this.dialogRef.close(this._selectedDocument);
  }

  private filterDocumentGroups(filterString: string): DocumentGroupDTO[] {
    if (filterString) {
      return this.documentGroups
        .map((documentGroup) => ({
          id: documentGroup.id,
          checkId: documentGroup.checkId,
          name: documentGroup.name,
          backgroundColour: documentGroup.backgroundColour,
          documents: this.filterDocuments(documentGroup.documents, filterString),
        }))
        .filter((documentGroup) => documentGroup.documents.length > 0);
    }
    return this.documentGroups;
  }

  private filterDocuments(documents: DocumentDTO[], filterString: string): DocumentDTO[] {
    return documents.filter((document) => document.title.toLowerCase().includes(filterString.toLowerCase()));
  }

  get filteredDocumentGroups(): Observable<DocumentGroupDTO[]> {
    return this._filteredDocumentGroups;
  }

  get filterFormGroup(): FormGroup {
    return this._filterFormGroup;
  }

  get selectedDocument(): DocumentDTO {
    return this._selectedDocument;
  }
}
