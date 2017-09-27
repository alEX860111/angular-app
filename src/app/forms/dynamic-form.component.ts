import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormElement } from './form-element';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [DynamicFormService]
})
export class DynamicFormComponent implements OnInit {

  @Input() elements: FormElement<any>[] = [];

  @Input() showAbort = false;

  @Output() submitForm = new EventEmitter<any>();

  @Output() abortForm = new EventEmitter();

  form: FormGroup;

  constructor(private dynamicFormService: DynamicFormService) { }

  ngOnInit() {
    this.form = this.dynamicFormService.toFormGroup(this.elements);
  }

  onSubmit() {
    this.submitForm.emit(this.form.value);
  }

  onAbort() {
    this.abortForm.emit();
  }

}
