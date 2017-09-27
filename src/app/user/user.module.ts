import { NgModule } from '@angular/core';

import { DynamicFormsModule } from '../forms/forms.module';

import { routing } from './user.routing';
import { UserComponent } from './user.component';
import { ChangePasswordDialogComponent } from './change-password-dialog.component';

@NgModule({
  imports: [routing, DynamicFormsModule],
  declarations: [UserComponent, ChangePasswordDialogComponent],
  entryComponents: [ChangePasswordDialogComponent]
})
export default class UserModule { }
