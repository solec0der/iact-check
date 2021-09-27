import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../shared/services/customer.service';
import { CheckDTO } from '../../../../shared/dtos/check-dto';
import { CheckService } from '../../../../shared/services/check.service';
import { ConfirmDialogComponent } from '../../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss'],
})
export class CheckListComponent implements OnInit {
  public checks: CheckDTO[] = [];
  public displayedColumnsChecks = [
    'id',
    'title',
    'requiredLanguages',
    'activeFrom',
    'activeTo',
    'actions',
  ];

  private customerId: number = -1;

  constructor(
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private checkService: CheckService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private translateService: TranslateService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.customerId = Number(params.get('customerId'));
      this.reload();
    });
  }

  ngOnInit(): void {
    this.customerService.setActiveCustomerIfNotSet(this.customerId);
  }

  public reload(): void {
    this.loadData();
  }

  public showCheckDeletionDialog(checkId: number): void {
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
        this.deleteCheckById(checkId);
      }
    });
  }

  private deleteCheckById(checkId: number) {
    this.checkService.deleteCheckById(checkId).subscribe((_) => {
      this.matSnackBar.open(
        this.translateService.instant('CHECKS.DELETED_MESSAGE'),
        this.translateService.instant('SHARED.CLOSE'),
        {
          duration: 5000,
        }
      );
      this.reload();
    });
  }

  private loadData(): void {
    this.checks = [];

    this.checkService
      .getChecksByCustomerId(this.customerId)
      .subscribe((checks) => {
        this.checks = checks;
      });
  }
}
