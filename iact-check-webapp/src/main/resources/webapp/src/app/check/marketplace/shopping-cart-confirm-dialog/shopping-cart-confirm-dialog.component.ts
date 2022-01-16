import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubmissionDTO } from '../../../shared/dtos/submission-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubmissionService } from '../../../shared/services/submission.service';

@Component({
  selector: 'app-shopping-cart-confirm-dialog',
  templateUrl: './shopping-cart-confirm-dialog.component.html',
  styleUrls: ['./shopping-cart-confirm-dialog.component.scss'],
})
export class ShoppingCartConfirmDialogComponent implements OnInit {
  private readonly _emailFormGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public submission: SubmissionDTO,
    private readonly submissionService: SubmissionService,
    private readonly matDialogRef: MatDialogRef<ShoppingCartConfirmDialogComponent>
  ) {
    this._emailFormGroup = new FormGroup({
      email: new FormControl(submission.email, [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {}

  public saveEmailAndConfirm(): void {
    const newEmail = this.emailFormGroup.value.email;

    if (newEmail !== this.submission.email) {
      this.submission.email = newEmail;

      this.submissionService.updateSubmissionById(<number>this.submission.id, this.submission).subscribe(() => {
        this.matDialogRef.close(true);
      });
    } else {
      this.matDialogRef.close(true);
    }
  }

  get emailFormGroup(): FormGroup {
    return this._emailFormGroup;
  }
}
