import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckStateService } from '../check-state.service';
import { SubmissionDTO } from '../../shared/dtos/submission-dto';
import { FlashCardsComponent } from './flash-cards/flash-cards.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Steps } from '../steps/steps';
import { SubmissionService } from '../../shared/services/submission.service';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { CheckDTO } from '../../shared/dtos/check-dto';
import { MarketplaceTileConfigDTO } from '../../shared/dtos/marketplace-tile-config-dto';
import { ShoppingCartConfirmDialogComponent } from './shopping-cart-confirm-dialog/shopping-cart-confirm-dialog.component';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {
  public submission!: SubmissionDTO;
  public check!: CheckDTO;

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly submissionService: SubmissionService,
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.checkStateService.getSubmission().subscribe((submission) => {
      this.submission = submission;
    });

    this.checkStateService.getActiveCheck().subscribe((check) => {
      this.check = check;
    });
  }

  public goToQuiz(): void {
    this.router.navigate(['../', 'steps', Steps.QuestionsForm], { relativeTo: this.activatedRoute }).then();
  }

  public goToDocumentViewer(marketplaceTileConfig: MarketplaceTileConfigDTO): void {
    this.router
      .navigate(['document-groups'], {
        relativeTo: this.activatedRoute,
        queryParams: {
          documentGroupListTitle: marketplaceTileConfig.documentGroupListTitle,
          documentGroupListSubtitle: marketplaceTileConfig.documentGroupListSubtitle,
          documentGroupsDisplayType: marketplaceTileConfig.documentGroupsDisplayType,
          displayedDocumentGroups: marketplaceTileConfig.displayedDocumentGroups
            .sort((a, b) => a.position - b.position)
            .map((_) => _.documentGroupId)
            .join(','),
          documentsTableColumnName: marketplaceTileConfig.documentsTableColumnName,
          documentGroupsTilesPerRow: marketplaceTileConfig.documentGroupsTilesPerRow,
        },
      })
      .then();
  }

  public openFlashCardsComponent(): void {
    this.matDialog.open(FlashCardsComponent);
  }

  public goToFinalSlide(): void {
    this.matDialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Achtung',
          message:
            'Wenn du den Check abschliesst, werden all deine Daten gelöscht. Mach das nur, wenn du ganz sicher bist, ' +
            'dass du am Ende angelangt bist',
          buttonTextCancel: 'Nein, nicht abschliessen',
          buttonTextConfirm: 'Ja, abschliessen und Daten löschen',
        },
      })
      .afterClosed()
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this.router.navigate(['final-slide'], { relativeTo: this.activatedRoute }).then();
        }
      });
  }

  public requestDocuments(): void {
    this.matDialog
      .open(ShoppingCartConfirmDialogComponent, {
        data: this.submission,
      })
      .afterClosed()
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this.submissionService.requestBookmarkedItemsBySubmissionId(<number>this.submission.id).subscribe(() => {
            this.router.navigate(['final-slide'], { relativeTo: this.activatedRoute }).then();
          });
        }
      });
  }

  public getTextWithReplacedPlaceholders(text: string | undefined): string {
    if (text) {
      const replacements = [
        { placeholder: '{{ firstName }}', replacement: this.submission.firstName },
        { placeholder: '{{ lastName }}', replacement: this.submission.lastName },
      ];

      let textWithReplacements = text;

      replacements.forEach((replacement) => {
        textWithReplacements = textWithReplacements.replace(replacement.placeholder, replacement.replacement);
      });

      return textWithReplacements;
    }
    return '';
  }
}
