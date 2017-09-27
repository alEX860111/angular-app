import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { FormElement } from '../forms/form-element';
import { TextElement, TextElementType } from '../forms/text-element';
import { SelectElement } from '../forms/select-element';
import { DynamicFormComponent } from '../forms/dynamic-form.component';

import { ChangePasswordRequest } from './change-password-request';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './change-password-dialog.component.html'
})
export class ChangePasswordDialogComponent implements OnInit {

  @ViewChild(DynamicFormComponent) changePasswordForm: DynamicFormComponent;

  public elements: FormElement<any>[];

  constructor(private dialogRef: MdDialogRef<ChangePasswordDialogComponent>) { }

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

  onSubmit() {
    const changePasswordRequest: ChangePasswordRequest = {
      oldPassword: this.changePasswordForm.form.value.password,
      newPassword: this.changePasswordForm.form.value.newPassword
    };
    this.dialogRef.close(changePasswordRequest);
  }

  close() {
    this.dialogRef.close();
  }

}
