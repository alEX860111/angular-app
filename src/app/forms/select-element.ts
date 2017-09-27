import { FormElement } from './form-element';
import { ValidatorFn } from '@angular/forms';

interface Option {
  value: string;
  label: string;
}

export class SelectElement implements FormElement<string> {

  key: string;

  label = '';
  value = '';
  required = false;
  validators: ValidatorFn[] = [];

  options: Option[] = [];

  constructor(key: string) {
    this.key = key;
  }

  get controlType() {
    return 'Select';
  }

  withLabel(label: string) {
    this.label = label;
    return this;
  }

  withValue(value: string) {
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

  withOptions(options: Option[]) {
    this.options = options;
    return this;
  }

}
