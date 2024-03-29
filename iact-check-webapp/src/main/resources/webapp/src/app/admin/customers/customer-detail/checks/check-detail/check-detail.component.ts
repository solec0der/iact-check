import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckService } from '../../../../../shared/services/check.service';
import { CheckDTO } from '../../../../../shared/dtos/check-dto';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomerService } from '../../../../../shared/services/customer.service';
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
  public subtitleTranslationsFormArray = new FormArray([]);
  public emailSubjectTranslationsFormArray = new FormArray([]);
  public emailMessageTranslationsFormArray = new FormArray([]);
  public textMessageTranslationsFormArray = new FormArray([]);

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

    const subtitleTranslationsBeforeChange = TranslationUtil.convertTranslationsFormArrayToTranslationsMap(
      this.subtitleTranslationsFormArray
    );

    const emailSubjectTranslationsBeforeChange = TranslationUtil.convertTranslationsFormArrayToTranslationsMap(
      this.emailSubjectTranslationsFormArray
    );

    const emailMessageTranslationsBeforeChange = TranslationUtil.convertTranslationsFormArrayToTranslationsMap(
      this.emailMessageTranslationsFormArray
    );

    const textMessageTranslationsBeforeChange = TranslationUtil.convertTranslationsFormArrayToTranslationsMap(
      this.textMessageTranslationsFormArray
    );

    if (!requiredLanguages.some((language) => language.locale === this.checkFormGroup.value.defaultLanguage)) {
      this.checkFormGroup.get('defaultLanguage')?.setValue('');
    }

    this.titleTranslationsFormArray.clear();
    this.subtitleTranslationsFormArray.clear();
    this.emailSubjectTranslationsFormArray.clear();
    this.emailMessageTranslationsFormArray.clear();
    this.textMessageTranslationsFormArray.clear();

    requiredLanguages.sort((a, b) => a.language.localeCompare(b.language));

    requiredLanguages.forEach((language) => {
      if (language) {
        if (titleTranslationsBeforeChange[language.locale]) {
          this.checkDTO.title[language.locale] = titleTranslationsBeforeChange[language.locale];
        } else if (!this.checkDTO.title[language.locale]) {
          this.checkDTO.title[language.locale] = '';
        }

        if (subtitleTranslationsBeforeChange[language.locale]) {
          this.checkDTO.subtitle[language.locale] = subtitleTranslationsBeforeChange[language.locale];
        } else if (!this.checkDTO.subtitle[language.locale]) {
          this.checkDTO.subtitle[language.locale] = '';
        }

        if (emailMessageTranslationsBeforeChange[language.locale]) {
          this.checkDTO.emailMessage[language.locale] = emailMessageTranslationsBeforeChange[language.locale];
        } else if (!this.checkDTO.emailMessage[language.locale]) {
          this.checkDTO.emailMessage[language.locale] = '';
        }

        if (emailSubjectTranslationsBeforeChange[language.locale]) {
          this.checkDTO.emailSubject[language.locale] = emailSubjectTranslationsBeforeChange[language.locale];
        } else if (!this.checkDTO.emailSubject[language.locale]) {
          this.checkDTO.emailSubject[language.locale] = '';
        }

        if (textMessageTranslationsBeforeChange[language.locale]) {
          this.checkDTO.textMessage[language.locale] = textMessageTranslationsBeforeChange[language.locale];
        } else if (!this.checkDTO.textMessage[language.locale]) {
          this.checkDTO.textMessage[language.locale] = '';
        }

        this.titleTranslationsFormArray.push(
          TranslationUtil.createTranslationsFormGroup(language, this.checkDTO.title[language.locale])
        );

        this.subtitleTranslationsFormArray.push(
          TranslationUtil.createTranslationsFormGroup(language, this.checkDTO.subtitle[language.locale])
        );

        this.emailSubjectTranslationsFormArray.push(
          TranslationUtil.createTranslationsFormGroup(language, this.checkDTO.emailSubject[language.locale], false)
        );

        this.emailMessageTranslationsFormArray.push(
          TranslationUtil.createTranslationsFormGroup(language, this.checkDTO.emailMessage[language.locale], false)
        );

        this.textMessageTranslationsFormArray.push(
          TranslationUtil.createTranslationsFormGroup(language, this.checkDTO.textMessage[language.locale], false)
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
      subtitle: TranslationUtil.convertTranslationsFormArrayToTranslationsMap(this.subtitleTranslationsFormArray),
      defaultLanguage: getLanguageByLocale(this.checkFormGroup.value.defaultLanguage)!,
      requiredLanguages: this.checkFormGroup.value.requiredLanguages,
      questionCategories: [],
      introductionSlideConfiguration: {
        showIntroductionSlide: this.checkFormGroup.value.showIntroductionSlide,
        title: this.checkFormGroup.value.introductionSlideTitle,
        subtitle: this.checkFormGroup.value.introductionSlideSubtitle,
        text: this.checkFormGroup.value.introductionSlideText,
      },
      emailSubject: {},
      emailMessage: {},
      textMessage: {},
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
      subtitle: TranslationUtil.convertTranslationsFormArrayToTranslationsMap(this.subtitleTranslationsFormArray),
      defaultLanguage: getLanguageByLocale(this.checkFormGroup.value.defaultLanguage)!,
      requiredLanguages: this.checkFormGroup.value.requiredLanguages,
      questionCategories: [],
      introductionSlideConfiguration: {
        showIntroductionSlide: this.checkFormGroup.value.showIntroductionSlide,
        title: this.checkFormGroup.value.introductionSlideTitle,
        subtitle: this.checkFormGroup.value.introductionSlideSubtitle,
        text: this.checkFormGroup.value.introductionSlideText,
      },
      emailSubject: TranslationUtil.convertTranslationsFormArrayToTranslationsMap(
        this.emailSubjectTranslationsFormArray
      ),
      emailMessage: TranslationUtil.convertTranslationsFormArrayToTranslationsMap(
        this.emailMessageTranslationsFormArray
      ),
      textMessage: TranslationUtil.convertTranslationsFormArrayToTranslationsMap(this.textMessageTranslationsFormArray),
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
      showIntroductionSlide: new FormControl(
        this.action === 'edit' ? this.checkDTO.introductionSlideConfiguration.showIntroductionSlide : false
      ),
      introductionSlideTitle: new FormControl(
        this.action === 'edit' ? this.checkDTO.introductionSlideConfiguration.title : ''
      ),
      introductionSlideSubtitle: new FormControl(
        this.action === 'edit' ? this.checkDTO.introductionSlideConfiguration.subtitle : ''
      ),
      introductionSlideText: new FormControl(
        this.action === 'edit' ? this.checkDTO.introductionSlideConfiguration.text : ''
      ),
    });

    this.titleTranslationsFormArray.clear();
    this.subtitleTranslationsFormArray.clear();
    this.emailSubjectTranslationsFormArray.clear();
    this.emailMessageTranslationsFormArray.clear();
    this.textMessageTranslationsFormArray.clear();
    this.checkDTO.requiredLanguages.sort((a, b) => a.locale.localeCompare(b.locale));

    this.checkDTO.requiredLanguages.forEach((value) => {
      this.titleTranslationsFormArray.push(
        TranslationUtil.createTranslationsFormGroup(value, this.checkDTO.title[value.locale])
      );

      this.subtitleTranslationsFormArray.push(
        TranslationUtil.createTranslationsFormGroup(value, this.checkDTO.subtitle[value.locale])
      );

      this.emailSubjectTranslationsFormArray.push(
        TranslationUtil.createTranslationsFormGroup(value, this.checkDTO.emailSubject[value.locale], false)
      );

      this.emailMessageTranslationsFormArray.push(
        TranslationUtil.createTranslationsFormGroup(value, this.checkDTO.emailMessage[value.locale], false)
      );

      this.textMessageTranslationsFormArray.push(
        TranslationUtil.createTranslationsFormGroup(value, this.checkDTO.textMessage[value.locale], false)
      );
    });
  }

  private createEmptyCheckDTO(): void {
    this.checkDTO = {
      customerId: this.customerId,
      title: {
        'de-CH': '',
      },
      subtitle: {
        'de-CH': '',
      },
      defaultLanguage: DEFAULT_LANGUAGE,
      requiredLanguages: [DEFAULT_LANGUAGE],
      questionCategories: [],
      introductionSlideConfiguration: {
        showIntroductionSlide: false,
      },
      emailSubject: {
        'de-CH': '',
      },
      emailMessage: {
        'de-CH': '',
      },
      textMessage: {
        'de-CH': '',
      },
    };
  }
}
