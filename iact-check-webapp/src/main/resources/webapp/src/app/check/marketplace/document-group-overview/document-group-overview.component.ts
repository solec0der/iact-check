import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DocumentGroupService } from '../../../shared/services/document-group.service';
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

  public title!: string;
  public subtitle!: string;
  public displayType!: string;

  public displayedColumnsDocumentGroups = ['name'];

  private displayedDocumentGroups!: number[];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly documentGroupService: DocumentGroupService,
    private readonly checkStateService: CheckStateService
  ) {
    this.activatedRoute.queryParamMap.subscribe((queryParamsMap) => {
      this.title = String(queryParamsMap.get('title'));
      this.subtitle = String(queryParamsMap.get('subtitle'));
      this.displayType = String(queryParamsMap.get('displayType'));
      this.displayedDocumentGroups = String(queryParamsMap.get('displayedDocumentGroups')).split(',').map(value => Number(value));
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  public goToDocumentOverview(documentGroupId: number): void {
    this.router.navigate([documentGroupId, 'documents'], { relativeTo: this.activatedRoute }).then();
  }

  public goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute }).then();
  }

  private loadData(): void {
    this.checkStateService.getActiveCheck().subscribe((check) => {
      this.documentGroupService.getDocumentGroupsByCheckId(<number>check.id).subscribe((documentGroups) => {
        this.documentGroups = documentGroups.filter((documentGroup) =>
          this.displayedDocumentGroups.includes(documentGroup.id)
        );
      });
    });
  }
}
