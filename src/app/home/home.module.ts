import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { routing } from './home.routing';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [routing, SharedModule],
  declarations: [HomeComponent]
})
export default class HomeModule { }
