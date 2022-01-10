import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DocumentService } from '../../../shared/services/document.service';
import { CheckStateService } from '../../check-state.service';
import { DocumentGroupDTO } from '../../../shared/dtos/document-group-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-document-group-overview',
  templateUrl: './document-group-overview.component.html',
  styleUrls: ['./document-group-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentGroupOverviewComponent implements OnInit {
  public documentGroups!: DocumentGroupDTO[];

  public documentGroupListTitle!: string;
  public documentGroupListSubtitle!: string;
  public documentGroupsDisplayType!: string;
  private documentsTableColumnName!: string;

  public displayedColumnsDocumentGroups = ['name'];

  private displayedDocumentGroups!: number[];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly documentGroupService: DocumentService,
    private readonly checkStateService: CheckStateService
  ) {
    this.activatedRoute.queryParamMap.subscribe((queryParamsMap) => {
      this.documentGroupListTitle = String(queryParamsMap.get('documentGroupListTitle'));
      this.documentGroupListSubtitle = String(queryParamsMap.get('documentGroupListSubtitle'));
      this.documentGroupsDisplayType = String(queryParamsMap.get('documentGroupsDisplayType'));
      this.documentsTableColumnName = String(queryParamsMap.get('documentsTableColumnName'));
      this.displayedDocumentGroups = String(queryParamsMap.get('displayedDocumentGroups'))
        .split(',')
        .map((value) => Number(value));
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  public goToDocumentOverview(documentGroupId: number): void {
    this.router
      .navigate([documentGroupId, 'documents'], {
        relativeTo: this.activatedRoute,
        queryParams: {
          documentsTableColumnName: this.documentsTableColumnName,
        },
      })
      .then();
  }

  public goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute }).then();
  }

  private loadData(): void {
    this.checkStateService.getActiveCheck().subscribe((check) => {
      this.documentGroupService.getDocumentGroupsByCheckId(<number>check.id).subscribe((documentGroups) => {
        this.documentGroups = [];

        this.displayedDocumentGroups.forEach((documentGroupId) => {
          const documentGroup = documentGroups.find((documentGroup) => documentGroup.id === documentGroupId);
          if (documentGroup) {
            this.documentGroups.push(documentGroup);
          }
        });
      });
    });
  }
}
