import { Component, OnInit } from '@angular/core';
import { DocumentGroupService } from '../../../shared/services/document-group.service';
import { CheckStateService } from '../../check-state.service';
import { DocumentGroupDTO } from '../../../shared/dtos/document-group-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-document-group-overview',
  templateUrl: './document-group-overview.component.html',
  styleUrls: ['./document-group-overview.component.scss'],
})
export class DocumentGroupOverviewComponent implements OnInit {
  public documentGroups!: DocumentGroupDTO[];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly documentGroupService: DocumentGroupService,
    private readonly checkStateService: CheckStateService
  ) {}

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
        this.documentGroups = documentGroups;
      });
    });
  }
}
