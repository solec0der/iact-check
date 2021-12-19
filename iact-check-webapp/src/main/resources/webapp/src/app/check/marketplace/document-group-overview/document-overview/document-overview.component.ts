import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentGroupService } from '../../../../shared/services/document-group.service';
import { DocumentGroupDTO } from '../../../../shared/dtos/document-group-dto';
import { DocumentDTO } from '../../../../shared/dtos/document-dto';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDetailComponent } from './document-detail/document-detail.component';

@Component({
  selector: 'app-document-overview',
  templateUrl: './document-overview.component.html',
  styleUrls: ['./document-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentOverviewComponent implements OnInit {
  public documentGroup!: DocumentGroupDTO;
  private documentGroupId!: number;

  public displayedColumnsDocuments = ['title'];

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly documentGroupService: DocumentGroupService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.documentGroupId = Number(params.get('documentGroupId'));
      this.loadData();
    });
  }

  ngOnInit(): void {}

  public openDocument(document: DocumentDTO): void {
    this.matDialog.open(DocumentDetailComponent, {
      width: '85%',
      data: document,
    });
  }

  public goBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute }).then();
  }

  private loadData(): void {
    this.documentGroupService.getDocumentGroupById(this.documentGroupId).subscribe((documentGroup) => {
      this.documentGroup = documentGroup;
    });
  }
}
