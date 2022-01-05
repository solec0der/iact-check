import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentDTO } from '../../../../../shared/dtos/document-dto';
import { CORE_URL } from '../../../../../app.config';
import { SubmissionService } from '../../../../../shared/services/submission.service';
import { CheckStateService } from '../../../../check-state.service';
import { SubmissionDTO } from '../../../../../shared/dtos/submission-dto';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
})
export class DocumentDetailComponent implements OnInit {
  private _submission!: SubmissionDTO;

  constructor(
    @Inject(MAT_DIALOG_DATA) public document: DocumentDTO,
    private readonly submissionService: SubmissionService,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public getFileUrl(): string {
    return `${CORE_URL}/api/documents/${this.document.id}/file`;
  }

  public isDocumentBookmarked(): boolean {
    return this.submission.bookmarkedDocuments.some((document) => document.documentId === this.document.id);
  }

  public toggleBookmarkOnDocument(): void {
    if (this.isDocumentBookmarked()) {
      const index = this._submission.bookmarkedDocuments.findIndex(
        (document) => document.documentId === this.document.id
      );
      this._submission.bookmarkedDocuments.splice(index, 1);
    } else {
      this._submission.bookmarkedDocuments.push({
        id: -1,
        documentId: this.document.id,
      });
    }

    this.submissionService
      .addBookmarkedDocumentsToSubmission(<number>this.submission.id, this._submission.bookmarkedDocuments)
      .subscribe((submission) => {
        this.checkStateService.setSubmission(submission);
      });
  }

  private loadData(): void {
    this.checkStateService.getSubmission().subscribe((submission) => {
      this._submission = submission;
    });
  }

  get submission(): SubmissionDTO {
    return this._submission;
  }
}
