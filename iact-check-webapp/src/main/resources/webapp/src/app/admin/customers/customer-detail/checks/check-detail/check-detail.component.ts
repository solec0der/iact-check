import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckService } from '../../../../shared/services/check.service';
import { CheckDTO } from '../../../../shared/dtos/check-dto';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomerService } from '../../../../shared/services/customer.service';
import { ConfirmDialogComponent } from '../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DEFAULT_LANGUAGE, getLanguageByLocale, LanguageDTO } from '../../../../../shared/dtos/language-dto';
import { AVAILABLE_LANGUAGES } from '../../../../../shared/model/available-languages';
import { TranslationUtil } from '../../../../shared/util/translation.util';
import { SnackBarService } from '../../../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-check-detail',
  templateUrl: './check-detail.component.html',
  styleUrls: ['./check-detail.component.scss'],
})
export class CheckDetailComponent implements OnInit {
  public action = '';
  public checkId = -1;
  public customerId = -1;

  public checkDTO!: CheckDTO;
  public checkFormGroup!: FormGroup;

  public titleTranslationsFormArray = new FormArray([]);

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private checkService: CheckService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService,
    private snackBarService: SnackBarService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.action = String(params.get('action'));
      this.checkId = Number(params.get('checkId'));
      this.customerId = Number(params.get('customerId'));
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);
    if (this.action === 'edit') {
      this.checkService.getCheckById(this.checkId).subscribe((checkDTO) => {
        this.checkDTO = checkDTO;
        this.createCheckFormGroup();
      });
    } else if (this.action === 'create') {
      this.createCheckFormGroup();
    }
  }

  public save(): void {
    if (this.action === 'create') {
      this.createCheck();
    } else if (this.action === 'edit') {
      this.updateCheck();
    }
  }

  public showCheckDeletionDialog(): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('CHECKS.DELETION_DIALOG.TITLE'),
        message: this.translateService.instant('CHECKS.DELETION_DIALOG.MESSAGE'),
        buttonTextCancel: this.translateService.instant('CHECKS.DELETION_DIALOG.BUTTON_TEXT_CANCEL'),
        buttonTextConfirm: this.translateService.instant('CHECKS.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'),
      },
    });

    dialogRef.afterClosed().subscribe((hasConfirmed) => {
      if (hasConfirmed) {
        this.deleteCheck();
      }
    });
  }

  public get availableLanguages(): LanguageDTO[] {
    return AVAILABLE_LANGUAGES;
  }

  public onRequiredLanguagesChange(requiredLanguages: LanguageDTO[]) {
    const titleTranslationsBeforeChange = TranslationUtil.convertTranslationsFormArrayToTranslationsMap(
      this.titleTranslationsFormArray
    );

    if (!requiredLanguages.some((language) => language.locale === this.checkFormGroup.value.defaultLanguage)) {
      this.checkFormGroup.get('defaultLanguage')?.setValue('');
    }

    this.titleTranslationsFormArray.clear();
    requiredLanguages
      .sort((a, b) => a.language.localeCompare(b.language))
      .forEach((language) => {
        if (language) {
          if (titleTranslationsBeforeChange[language.locale]) {
            this.checkDTO.title[language.locale] = titleTranslationsBeforeChange[language.locale];
          } else if (!this.checkDTO.title[language.locale]) {
            this.checkDTO.title[language.locale] = '';
          }

          this.titleTranslationsFormArray.push(
            new FormGroup({
              translation: new FormControl(this.checkDTO.title[language.locale], Validators.required),
              language: new FormControl(language, Validators.required),
            })
          );
        }
      });
  }

  public compare(first: LanguageDTO, second: LanguageDTO): boolean {
    return first.locale === second.locale;
  }

  private deleteCheck() {
    this.checkService.deleteCheckById(this.checkDTO.id!).subscribe((_) => {
      this.snackBarService.open('CHECKS.DELETED_MESSAGE');
      this.router.navigate(['admin', 'customers', this.customerId, 'checks']).then();
    });
  }

  private createCheck(): void {
    const checkDTO: CheckDTO = {
      customerId: this.customerId,
      title: TranslationUtil.convertTranslationsFormArrayToTranslationsMap(this.titleTranslationsFormArray),
      defaultLanguage: getLanguageByLocale(this.checkFormGroup.value.defaultLanguage)!,
      requiredLanguages: this.checkFormGroup.value.requiredLanguages,
      activeFrom: this.checkFormGroup.value.activeFrom.toISOString(),
      activeTo: this.checkFormGroup.value.activeTo.toISOString(),
      questionCategories: [],
    };

    this.checkService.createCheck(checkDTO).subscribe((createdCheckDTO) => {
      this.checkDTO = createdCheckDTO;

      this.router
        .navigate(['../../' + createdCheckDTO.id + '/edit'], {
          relativeTo: this.activatedRoute,
        })
        .then(() => {
          this.createCheckFormGroup();
          this.snackBarService.open('CHECKS.CREATED_MESSAGE');
        });
    });
  }

  private updateCheck(): void {
    const checkDTO: CheckDTO = {
      id: this.checkDTO.id,
      customerId: this.checkDTO.customerId,
      title: TranslationUtil.convertTranslationsFormArrayToTranslationsMap(this.titleTranslationsFormArray),
      defaultLanguage: getLanguageByLocale(this.checkFormGroup.value.defaultLanguage)!,
      requiredLanguages: this.checkFormGroup.value.requiredLanguages,
      activeFrom: this.checkFormGroup.value.activeFrom.toISOString(),
      activeTo: this.checkFormGroup.value.activeTo.toISOString(),
      questionCategories: [],
    };

    this.checkService.updateCheckById(this.checkId, checkDTO).subscribe((updatedCheckDTO) => {
      this.checkDTO = updatedCheckDTO;

      this.snackBarService.open('CHECKS.UPDATED_MESSAGE');
      this.createCheckFormGroup();
    });
  }

  private createCheckFormGroup(): void {
    if (this.action === 'create') {
      this.createEmptyCheckDTO();
    }

    this.checkFormGroup = new FormGroup({
      defaultLanguage: new FormControl(this.checkDTO.defaultLanguage.locale, Validators.required),
      requiredLanguages: new FormControl(this.checkDTO.requiredLanguages, Validators.required),
      activeFrom: new FormControl(
        this.action === 'edit' ? new Date(this.checkDTO.activeFrom) : '',
        Validators.required
      ),
      activeTo: new FormControl(this.action === 'edit' ? new Date(this.checkDTO.activeTo) : '', Validators.required),
    });

    this.titleTranslationsFormArray.clear();
    this.checkDTO.requiredLanguages
      .sort((a, b) => a.locale.localeCompare(b.locale))
      .forEach((value) => {
        this.titleTranslationsFormArray.push(
          new FormGroup({
            translation: new FormControl(this.checkDTO.title[value.locale], Validators.required),
            language: new FormControl(value, Validators.required),
          })
        );
      });
  }

  private createEmptyCheckDTO(): void {
    this.checkDTO = {
      customerId: this.customerId,
      title: {
        'de-CH': '',
      },
      defaultLanguage: DEFAULT_LANGUAGE,
      requiredLanguages: [DEFAULT_LANGUAGE],
      activeFrom: new Date(),
      activeTo: new Date(),
      questionCategories: [],
    };
  }
}
