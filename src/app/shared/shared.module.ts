import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { CdkTableModule } from '@angular/cdk/table';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { TimerComponent } from './timer.component';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule, RouterModule, CdkTableModule],
  exports: [CommonModule, MaterialModule, FlexLayoutModule, RouterModule, CdkTableModule,
    ConfirmationDialogComponent, TimerComponent, NavbarComponent],
  declarations: [ConfirmationDialogComponent, TimerComponent, NavbarComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule { }
