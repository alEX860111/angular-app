import { ValidatorFn } from '@angular/forms';

export class FormElement<T> {
  controlType: string;
  key: string;
  label: string;
  value: T;
  required: boolean;
  validators: ValidatorFn[];

  constructor(config: {
    controlType: string
    key: string,
    label?: string;
    value: T;
    required?: boolean;
    validators?: ValidatorFn[],
  }) {
    this.controlType = config.controlType;
    this.key = config.key;
    this.label = config.label === undefined ? '' : config.label;
    this.value = config.value;
    this.required = config.required === undefined ? false : config.required;
    this.validators = config.validators === undefined ? [] : config.validators;
  }
}
