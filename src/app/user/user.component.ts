import { Component, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material';

import { ChangePasswordDialogComponent } from './change-password-dialog.component';
import { ChangePasswordRequest } from './change-password-request';

import { AlertService } from '../core/alert.service';
import { SessionService } from '../core/session.service';
import { Session } from '../core/session';

import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [UserService]
})
export class UserComponent implements OnInit {

  public session: Session;

  constructor(
    private sessionService: SessionService,
    private dialog: MdDialog,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.session = this.sessionService.getSession();
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent).afterClosed().subscribe(changePasswordRequest => {
      if (!changePasswordRequest) {
        return;
      }
      this.userService.changePassword(changePasswordRequest, this.session.userId).subscribe(() => {
        this.alertService.alertSuccess('Successfully changed password.');
      }, () => {
        this.alertService.alertError('Failed to change password.');
      });
    });
  }

}
