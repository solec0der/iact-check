import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckStateService } from '../check-state.service';
import { SubmissionDTO } from '../../shared/dtos/submission-dto';
import { FlashCardsComponent } from './flash-cards/flash-cards.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Steps } from '../steps/steps';
import { SubmissionService } from '../../shared/services/submission.service';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { FlashCardsStateService } from './flash-cards/flash-cards-state.service';
import { FlashCardsUtil } from './flash-cards/flash-cards.util';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {
  public submission!: SubmissionDTO;

  constructor(
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly submissionService: SubmissionService,
    private readonly checkStateService: CheckStateService,
    private readonly flashCardsStateService: FlashCardsStateService
  ) {}

  ngOnInit(): void {
    this.checkStateService.getSubmission().subscribe((submission) => {
      this.submission = submission;
    });
  }

  public goToQuiz(): void {
    this.router.navigate(['../', 'steps', Steps.QuestionsForm], { relativeTo: this.activatedRoute }).then();
  }

  public goToProfiles(): void {
    this.router
      .navigate(['document-groups'], {
        relativeTo: this.activatedRoute,
        queryParams: {
          title: 'Profile',
          subtitle: 'Hier findest du Informationen über alle Funktionen im Militär',
          displayType: 'tiles',
          displayedDocumentGroups: '2,3,4,5,6,22',
        },
      })
      .then();
  }

  public goToGeneralInformationList(): void {
    this.router
      .navigate(['document-groups'], {
        relativeTo: this.activatedRoute,
        queryParams: {
          title: 'Allgemeine Informationen',
          subtitle: 'Hier findest du Informationen rund um das Militär',
          displayType: 'table',
          displayedDocumentGroups: '7,8,9,10,11,12,13,14,15,16,17,18,19,20,21',
        },
      })
      .then();
  }

  public openFlashCardsComponent(): void {
    this.matDialog.open(FlashCardsComponent);
  }

  public requestDocuments(): void {
    this.matDialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Achtung',
          message:
            'Wenn du dir die Dokumende zugesendet hast, werden all deine Daten gelöscht. Mach das nur, wenn du ganz sicher bist, dass du ' +
            'am Ende angelangt bist. ',
          buttonTextCancel: 'Nein, nicht versenden',
          buttonTextConfirm: 'Ja, zusenden und Daten löschen',
        },
      })
      .afterClosed()
      .subscribe((hasConfirmed) => {
        if (hasConfirmed) {
          this.submissionService.requestBookmarkedItemsBySubmissionId(<number>this.submission.id).subscribe(() => {
            this.checkStateService.resetCheck();
            this.flashCardsStateService.resetFlashCards();
          });
        }
      });
  }
}
