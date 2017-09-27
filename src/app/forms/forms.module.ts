import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormElementComponent } from './form-element.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, SharedModule],
  exports: [FormsModule, ReactiveFormsModule, SharedModule, DynamicFormComponent],
  declarations: [FormElementComponent, DynamicFormComponent]
})
export class DynamicFormsModule { }
