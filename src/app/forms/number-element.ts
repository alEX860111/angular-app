import { ValidatorFn } from '@angular/forms';

import { FormElement } from './form-element';

export class NumberElement implements FormElement<number> {

  key: string;

  label = '';
  value = 0;
  required = false;
  validators: ValidatorFn[] = [];

  type = 'number';

  constructor(key: string) {
    this.key = key;
  }

  get controlType() {
    return 'Input';
  }

  withLabel(label: string) {
    this.label = label;
    return this;
  }

  withValue(value: number) {
    this.value = value;
    return this;
  }

  withRequired() {
    this.required = true;
    return this;
  }

  withValidators(validators: ValidatorFn[]) {
    this.validators = validators;
    return this;
  }

}
