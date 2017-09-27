import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Injectable()
export class AlertService {

  private ALERT_DURATION_IN_MS = 5000;

  constructor(private snackBar: MdSnackBar) { }

  alertSuccess(msg: string) {
    const config = this.createConfig();
    this.snackBar.open(msg, null, config);
  }

  alertError(msg: string) {
    const config = this.createConfig();
    config.extraClasses = ['alert-error'];
    this.snackBar.open(msg, null, config);
  }

  private createConfig() {
    const config = new MdSnackBarConfig();
    config.duration = this.ALERT_DURATION_IN_MS;
    return config;
  }

}
