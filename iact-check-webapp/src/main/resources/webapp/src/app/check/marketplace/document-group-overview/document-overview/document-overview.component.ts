import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../../../shared/services/document.service';
import { DocumentGroupDTO } from '../../../../shared/dtos/document-group-dto';
import { DocumentDTO } from '../../../../shared/dtos/document-dto';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { Location } from '@angular/common';
import { CheckStateService } from '../../../check-state.service';
import { SubmissionDTO } from '../../../../shared/dtos/submission-dto';

@Component({
  selector: 'app-document-overview',
  templateUrl: './document-overview.component.html',
  styleUrls: ['./document-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentOverviewComponent implements OnInit {
  public documentGroup!: DocumentGroupDTO;
  public documentsTableColumnName!: string;
  private documentGroupId!: number;
  private _submission!: SubmissionDTO;

  public displayedColumnsDocuments = ['title', 'bookmarked'];

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkStateService: CheckStateService,
    private readonly documentGroupService: DocumentService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.documentGroupId = Number(params.get('documentGroupId'));
      this.loadData();
    });

    this.activatedRoute.queryParamMap.subscribe((queryParamsMap) => {
      this.documentsTableColumnName = String(queryParamsMap.get('documentsTableColumnName'));
    });
  }

  ngOnInit(): void {}

  public openDocument(document: DocumentDTO): void {
    this.matDialog.open(DocumentDetailComponent, {
      width: '90%',
      data: document,
    });
  }

  public goBack(): void {
    this.location.back();
  }

  public goBackToMarketplace(): void {
    this.router.navigate(['../../../'], { relativeTo: this.activatedRoute }).then();
  }

  public isDocumentBookmarked(documentId: number): boolean {
    return this.submission.bookmarkedDocuments.some((document) => document.documentId === documentId);
  }

  private loadData(): void {
    this.documentGroupService.getDocumentGroupById(this.documentGroupId).subscribe((documentGroup) => {
      this.documentGroup = documentGroup;
    });

    this.checkStateService.getSubmission().subscribe((submission) => {
      this._submission = submission;
    });
  }

  get submission(): SubmissionDTO {
    return this._submission;
  }
}
