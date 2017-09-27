import { NgModule } from '@angular/core';

import { DynamicFormsModule } from '../forms/forms.module';

import { routing } from './login.routing';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [routing, DynamicFormsModule],
  declarations: [LoginComponent]
})
export default class LoginModule { }
