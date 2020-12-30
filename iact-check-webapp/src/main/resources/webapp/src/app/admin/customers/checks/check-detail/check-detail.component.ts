import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckService } from '../../../shared/services/check.service';
import { CheckDTO } from '../../../shared/dtos/check-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { CustomerService } from '../../../shared/services/customer.service';
import { ConfirmDialogComponent } from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LanguageDTO } from '../../../../shared/dtos/language-dto';
import { AVAILABLE_LANGUAGES } from '../../../../shared/model/available-languages';

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

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private checkService: CheckService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService
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
        message: this.translateService.instant(
          'CHECKS.DELETION_DIALOG.MESSAGE'
        ),
        buttonTextCancel: this.translateService.instant(
          'CHECKS.DELETION_DIALOG.BUTTON_TEXT_CANCEL'
        ),
        buttonTextConfirm: this.translateService.instant(
          'CHECKS.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'
        ),
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

  private deleteCheck() {
    this.checkService.deleteCheckById(this.checkDTO.id).subscribe((_) => {
      this.matSnackBar.open(
        this.translateService.instant('CHECKS.DELETED_MESSAGE'),
        this.translateService.instant('SHARED.CLOSE'),
        {
          duration: 5000,
        }
      );
      this.router
        .navigate(['admin', 'customers', this.customerId, 'checks'])
        .then();
    });
  }

  private createCheck(): void {
    const checkDTO: CheckDTO = {
      id: -1,
      customerId: this.customerId,
      title: this.checkFormGroup.value.title,
      language: {
        language: '',
        locale: this.checkFormGroup.value.language
      },
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
          this.matSnackBar.open(
            this.translateService.instant('CHECKS.CREATED_MESSAGE'),
            this.translateService.instant('SHARED.CLOSE'),
            {
              duration: 5000,
            }
          );
        });
    });
  }

  private updateCheck(): void {
    const checkDTO: CheckDTO = {
      id: this.checkDTO.id,
      customerId: this.checkDTO.customerId,
      title: this.checkFormGroup.value.title,
      language: {
        language: '',
        locale: this.checkFormGroup.value.language
      },
      activeFrom: this.checkFormGroup.value.activeFrom.toISOString(),
      activeTo: this.checkFormGroup.value.activeTo.toISOString(),
      questionCategories: [],
    };

    this.checkService
      .updateCheckById(this.checkId, checkDTO)
      .subscribe((updatedCheckDTO) => {
        this.checkDTO = updatedCheckDTO;

        this.matSnackBar.open(
          this.translateService.instant('CHECKS.UPDATED_MESSAGE'),
          this.translateService.instant('SHARED.CLOSE'),
          {
            duration: 5000,
          }
        );
        this.createCheckFormGroup();
      });
  }

  private createCheckFormGroup(): void {
    this.checkFormGroup = new FormGroup({
      title: new FormControl(
        this.action === 'edit' ? this.checkDTO.title : '',
        Validators.required
      ),
      language: new FormControl(
        this.action === 'edit' ? this.checkDTO.language.locale : '',
        Validators.required
      ),
      activeFrom: new FormControl(
        this.action === 'edit' ? new Date(this.checkDTO.activeFrom) : '',
        Validators.required
      ),
      activeTo: new FormControl(
        this.action === 'edit' ? new Date(this.checkDTO.activeTo) : '',
        Validators.required
      ),
    });
  }
}
