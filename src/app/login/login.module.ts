import { NgModule } from '@angular/core';

import { DynamicFormsModule } from '../forms/forms.module';
import { LoginService } from './login.service';

import { routing } from './login.routing';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [routing, DynamicFormsModule],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export default class LoginModule { }
