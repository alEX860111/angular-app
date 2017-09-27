import { ValidatorFn } from '@angular/forms';

import { FormElement } from './form-element';

export enum TextElementType {
  text,
  password
}

export class TextElement implements FormElement<string> {

  key: string;

  label = '';
  value = '';
  required = false;
  validators: ValidatorFn[] = [];

  type = 'text';

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

  withType(type: TextElementType) {
    this.type = TextElementType[type];
    return this;
  }

}
