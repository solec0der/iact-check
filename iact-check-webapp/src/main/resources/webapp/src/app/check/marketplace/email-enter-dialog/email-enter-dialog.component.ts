import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubmissionDTO } from '../../../shared/dtos/submission-dto';
import { SubmissionService } from '../../../shared/services/submission.service';

@Component({
  selector: 'app-email-enter-dialog',
  templateUrl: './email-enter-dialog.component.html',
  styleUrls: ['./email-enter-dialog.component.scss'],
})
export class EmailEnterDialogComponent implements OnInit {
  private readonly _emailFormGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public submission: SubmissionDTO,
    private readonly submissionService: SubmissionService,
    private readonly matDialogRef: MatDialogRef<EmailEnterDialogComponent>
  ) {
    this._emailFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {}

  public saveEmail(): void {
    this.submission.email = this.emailFormGroup.value.email;

    this.submissionService.updateSubmissionById(<number>this.submission.id, this.submission).subscribe(() => {
      this.matDialogRef.close(true);
    });
  }

  get emailFormGroup(): FormGroup {
    return this._emailFormGroup;
  }
}
