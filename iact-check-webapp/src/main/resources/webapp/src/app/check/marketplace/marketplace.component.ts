import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckStateService } from '../check-state.service';
import { SubmissionDTO } from '../../shared/dtos/submission-dto';
import { FlashCardsComponent } from './flash-cards/flash-cards.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Steps } from '../steps/steps';

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
    private readonly checkStateService: CheckStateService
  ) {}

  ngOnInit(): void {
    this.checkStateService.getSubmission().subscribe((submission) => {
      this.submission = submission;
    });
  }

  public goToQuiz(): void {
    this.router.navigate(['../', 'steps', Steps.QuestionsForm], { relativeTo: this.activatedRoute }).then();
  }

  public goToDocumentGroups(): void {
    this.router.navigate(['document-groups'], { relativeTo: this.activatedRoute }).then();
  }

  public openFlashCardsComponent(): void {
    this.matDialog.open(FlashCardsComponent);
  }
}
