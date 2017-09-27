import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { FormElement } from '../forms/form-element';
import { TextElement, TextElementType } from '../forms/text-element';

import { ChangePasswordRequest } from './change-password-request';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './change-password-dialog.component.html'
})
export class ChangePasswordDialogComponent implements OnInit {

  public elements: FormElement<any>[];

  constructor(private dialogRef: MatDialogRef<ChangePasswordDialogComponent>) { }

  ngOnInit() {
    this.elements = [
      new TextElement('password')
        .withLabel('Password')
        .withRequired()
        .withType(TextElementType.password),
      new TextElement('newPassword')
        .withLabel('New Password')
        .withRequired()
        .withType(TextElementType.password)
        .withValidators([(control: AbstractControl): { [key: string]: any } => {
          if (!control.parent) {
            return null;
          }
          const confirmedNewPassword = control.parent.get('confirmedNewPassword');
          if (confirmedNewPassword) {
            confirmedNewPassword.updateValueAndValidity();
          }
        }]),
      new TextElement('confirmedNewPassword')
        .withLabel('Confirm New Password')
        .withRequired()
        .withType(TextElementType.password)
        .withValidators([(control: AbstractControl): { [key: string]: any } => {
          if (!control.parent) {
            return null;
          }
          const password = control.parent.get('newPassword');
          if (password && password.value && control.value && password.value !== control.value) {
            return { mismatchedPasswords: 'Passwords do not match' };
          }
        }])
    ];
  }

  onSubmit(value) {
    const changePasswordRequest: ChangePasswordRequest = {
      oldPassword: value.password,
      newPassword: value.newPassword
    };
    this.dialogRef.close(changePasswordRequest);
  }

  close() {
    this.dialogRef.close();
  }

}
