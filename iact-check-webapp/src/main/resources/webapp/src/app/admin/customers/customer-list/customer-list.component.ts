import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../shared/services/customer.service';
import { CustomerDTO } from '../../../shared/dtos/customer-dto';
import { UserService } from '../../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ActiveCustomerService } from '../../shared/services/active-customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  public customers: CustomerDTO[] = [];
  public displayedColumnsCustomers = [
    'id',
    'name',
    'primaryColour',
    'backgroundColour',
    'accentColour',
    'textColour',
    'font',
    'actions',
  ];

  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private activeCustomerService: ActiveCustomerService,
    private translateService: TranslateService,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activeCustomerService.unsetActiveCustomer();
    this.reload();
  }

  public reload(): void {
    this.loadData();
  }

  get isSuperUser(): boolean {
    return this.userService.isSuperUser();
  }

  public showCustomerDeletionDialog(customerId: number): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('CUSTOMERS.DELETION_DIALOG.TITLE'),
        message: this.translateService.instant(
          'CUSTOMERS.DELETION_DIALOG.MESSAGE'
        ),
        buttonTextCancel: this.translateService.instant(
          'CUSTOMERS.DELETION_DIALOG.BUTTON_TEXT_CANCEL'
        ),
        buttonTextConfirm: this.translateService.instant(
          'CUSTOMERS.DELETION_DIALOG.BUTTON_TEXT_CONFIRM'
        ),
      },
    });

    dialogRef.afterClosed().subscribe((hasConfirmed) => {
      if (hasConfirmed) {
        this.deleteCustomerById(customerId);
      }
    });
  }

  private deleteCustomerById(customerId: number): void {
    this.customerService.deleteCustomerById(customerId).subscribe((_) => {
      this.matSnackBar.open(
        this.translateService.instant('CUSTOMERS.DELETED_MESSAGE'),
        this.translateService.instant('SHARED.CLOSE'),
        {
          duration: 5000,
        }
      );
      this.reload();
    });
  }

  private loadData(): void {
    this.customers = [];
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }
}
