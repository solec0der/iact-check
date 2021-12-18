import { Component, OnInit } from '@angular/core';
import { PossibleOutcomeDTO } from '../../../../../../../shared/dtos/possible-outcome-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../../../../../../shared/services/customer.service';
import { TranslateService } from '@ngx-translate/core';
import { PossibleOutcomeService } from '../../../../../../shared/services/possible-outcome.service';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { FileReaderUtil } from '../../../../../../shared/util/file-reader.util';
import { CORE_URL } from '../../../../../../../app.config';
import { ConfirmDialogComponent } from '../../../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ColourUtility } from '../../../../../../../shared/utils/colour.utility';

@Component({
  selector: 'app-possible-outcome-detail',
  templateUrl: './possible-outcome-detail.component.html',
  styleUrls: ['./possible-outcome-detail.component.scss'],
})
export class PossibleOutcomeDetailComponent implements OnInit {
  public action = '';
  public questionCategoryId = -1;
  public customerId = -1;
  public possibleOutcomeId = -1;

  public possibleOutcomeDTO!: PossibleOutcomeDTO;
  public possibleOutcomeFormGroup!: FormGroup;

  public thumbnail!: File;
  public pdf!: File;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService,
    private possibleOutcomeService: PossibleOutcomeService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.action = String(params.get('action'));
      this.possibleOutcomeId = Number(params.get('possibleOutcomeId'));
      this.customerId = Number(params.get('customerId'));
      this.questionCategoryId = Number(params.get('questionCategoryId'));
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);

    if (this.action === 'edit') {
      this.loadData();
    } else if (this.action === 'create') {
      this.createPossibleOutcomeFormGroup();
    }
  }

  public save(): void {
    if (this.action === 'create') {
      this.createPossibleOutcome();
    } else if (this.action === 'edit') {
      this.updatePossibleOutcome();
    }
  }

  public goBackToQuestionCategory(): void {
    this.router
      .navigate(['../../../edit'], {
        relativeTo: this.activatedRoute,
      })
      .then();
  }

  public showThumbnail(): void {
    window.open(CORE_URL + '/api/possible-outcomes/' + this.possibleOutcomeId + '/thumbnail', '_blank');
  }

  public showPdf(): void {
    window.open(CORE_URL + '/api/possible-outcomes/' + this.possibleOutcomeId + '/pdf', '_blank');
  }

  public removeThumbnail(): void {
    this.thumbnail = new File([], '');
    this.possibleOutcomeFormGroup.setControl('thumbnail', new FormControl(this.thumbnail));
  }

  public removePdf(): void {
    this.pdf = new File([], '');
    this.possibleOutcomeFormGroup.setControl('pdf', new FormControl(this.pdf));
  }

  public showPossibleOutcomeDeletionDialog(): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('POSSIBLE_OUTCOMES.DELETION_DIALOG.TITLE'),
        message: '',
        buttonTextCancel: this.translateService.instant('POSSIBLE_OUTCOMES.DELETION_DIALOG.BUTTON_TEXT_CANCEL'),
        buttonTextConfirm: this.translateService.instant('POSSIBLE_OUTCOMES.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'),
      },
    });

    dialogRef.afterClosed().subscribe((hasConfirmed) => {
      if (hasConfirmed) {
        this.deletePossibleOutcome();
      }
    });
  }

  private createPossibleOutcome(): void {
    const possibleOutcomeDTO: PossibleOutcomeDTO = {
      id: -1,
      questionCategoryId: this.questionCategoryId,
      title: this.possibleOutcomeFormGroup.value.title,
      subtitle: this.possibleOutcomeFormGroup.value.subtitle,
      description: this.possibleOutcomeFormGroup.value.description,
      youtubeUrl: this.possibleOutcomeFormGroup.value.youtubeUrl,
      backgroundColour: '#' + this.possibleOutcomeFormGroup.value.backgroundColour.hex,
      possibleScores: this.possibleOutcomeFormGroup.value.possibleScores.split(',').map((score: number) => ({
        id: -1,
        score: score,
      })),
    };

    this.possibleOutcomeService
      .createPossibleOutcome(possibleOutcomeDTO)
      .pipe(
        map((createdPossibleOutcomeDTO) => {
          this.possibleOutcomeDTO = createdPossibleOutcomeDTO;
          return createdPossibleOutcomeDTO;
        }),
        mergeMap((createdPossibleOutcomeDTO) => {
          return this.possibleOutcomeService.uploadAdditionalAssetsByPossibleOutcomeId(
            createdPossibleOutcomeDTO.id,
            this.possibleOutcomeFormGroup.value.thumbnail,
            this.possibleOutcomeFormGroup.value.pdf
          );
        })
      )
      .subscribe(() => {
        this.router
          .navigate(['../../' + this.possibleOutcomeDTO.id + '/edit'], {
            relativeTo: this.activatedRoute,
          })
          .then(() => {
            this.matSnackBar.open(
              this.translateService.instant('POSSIBLE_OUTCOMES.CREATED_MESSAGE'),
              this.translateService.instant('SHARED.CLOSE'),
              {
                duration: 5000,
              }
            );
            this.loadData();
          });
      });
  }

  private updatePossibleOutcome(): void {
    const possibleOutcomeDTO: PossibleOutcomeDTO = {
      id: this.possibleOutcomeId,
      questionCategoryId: this.questionCategoryId,
      title: this.possibleOutcomeFormGroup.value.title,
      subtitle: this.possibleOutcomeFormGroup.value.subtitle,
      description: this.possibleOutcomeFormGroup.value.description,
      youtubeUrl: this.possibleOutcomeFormGroup.value.youtubeUrl,
      backgroundColour: '#' + this.possibleOutcomeFormGroup.value.backgroundColour.hex,
      possibleScores: this.possibleOutcomeFormGroup.value.possibleScores.split(',').map((score: number) => ({
        id: -1,
        score: score,
      })),
    };

    this.possibleOutcomeService
      .updatePossibleOutcomeById(this.possibleOutcomeId, possibleOutcomeDTO)
      .pipe(
        map((updatedPossibleOutcomeDTO) => {
          this.possibleOutcomeDTO = updatedPossibleOutcomeDTO;
          return updatedPossibleOutcomeDTO;
        }),
        mergeMap((updatedPossibleOutcomeDTO) => {
          return this.possibleOutcomeService.uploadAdditionalAssetsByPossibleOutcomeId(
            updatedPossibleOutcomeDTO.id,
            this.possibleOutcomeFormGroup.value.thumbnail,
            this.possibleOutcomeFormGroup.value.pdf
          );
        })
      )
      .subscribe(() => {
        this.matSnackBar.open(
          this.translateService.instant('POSSIBLE_OUTCOMES.UPDATED_MESSAGE'),
          this.translateService.instant('SHARED.CLOSE'),
          {
            duration: 5000,
          }
        );
        this.createPossibleOutcomeFormGroup();
      });
  }

  private deletePossibleOutcome() {
    this.possibleOutcomeService.deletePossibleOutcomeById(this.possibleOutcomeId).subscribe(() => {
      this.matSnackBar.open(
        this.translateService.instant('POSSIBLE_OUTCOMES.DELETED_MESSAGE'),
        this.translateService.instant('SHARED.CLOSE'),
        {
          duration: 5000,
        }
      );
      this.router
        .navigate(['../../../edit'], {
          relativeTo: this.activatedRoute,
        })
        .then();
    });
  }

  private loadData(): void {
    this.possibleOutcomeService
      .getPossibleOutcomeById(this.possibleOutcomeId)
      .pipe(
        map((possibleOutcomeDTO) => {
          this.possibleOutcomeDTO = possibleOutcomeDTO;
          return possibleOutcomeDTO;
        }),
        mergeMap((possibleOutcomeDTO) => {
          const thumbnail = this.possibleOutcomeService.getThumbnailByPossibleOutcomeId(possibleOutcomeDTO.id);
          const pdf = this.possibleOutcomeService.getPdfByPossibleOutcomeId(possibleOutcomeDTO.id);

          return forkJoin([thumbnail, pdf]);
        })
      )
      .subscribe((result) => {
        this.thumbnail = FileReaderUtil.convertBlobToFile(result[0], this.possibleOutcomeDTO.title + '.png');
        this.pdf = FileReaderUtil.convertBlobToFile(result[1], this.possibleOutcomeDTO.title + '.pdf');
        this.createPossibleOutcomeFormGroup();
      });
  }

  private createPossibleOutcomeFormGroup(): void {
    const backgroundColour = ColourUtility.convertHexToColor(
      this.action === 'edit' ? this.possibleOutcomeDTO.backgroundColour : null
    );

    this.possibleOutcomeFormGroup = new FormGroup({
      title: new FormControl(this.action === 'edit' ? this.possibleOutcomeDTO.title : '', Validators.required),
      subtitle: new FormControl(this.action === 'edit' ? this.possibleOutcomeDTO.subtitle : '', Validators.required),
      description: new FormControl(
        this.action === 'edit' ? this.possibleOutcomeDTO.description : '',
        Validators.required
      ),
      possibleScores: new FormControl(
        this.action === 'edit' ? this.possibleOutcomeDTO.possibleScores.map((p) => p.score).join(', ') : '',
        Validators.required
      ),
      youtubeUrl: new FormControl(this.action === 'edit' ? this.possibleOutcomeDTO.youtubeUrl : ''),
      backgroundColour: new FormControl(backgroundColour ? backgroundColour : ''),
      thumbnail: new FormControl(this.thumbnail && this.thumbnail.size > 0 ? this.thumbnail : new File([], '')),
      pdf: new FormControl(this.pdf && this.pdf.size > 0 ? this.pdf : new File([], '')),
    });
  }
}
