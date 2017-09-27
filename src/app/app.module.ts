import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';

import { AppComponent } from './app.component';

@NgModule({
  imports: [routing, BrowserModule, HttpModule, CoreModule.forRoot(), SharedModule, BrowserAnimationsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }
  ]
})
export class AppModule { }
