import { ValidatorFn } from '@angular/forms';

export enum ControlType {
  Input,
  Select
}

export class FormElement<T> {
  controlType: string;
  key: string;
  label: string;
  value: T;
  required: boolean;
  validators: ValidatorFn[];

  constructor(config: {
    controlType: ControlType
    key: string,
    label?: string;
    value: T;
    required?: boolean;
    validators?: ValidatorFn[],
  }) {
    this.controlType = ControlType[config.controlType];
    this.key = config.key;
    this.label = config.label === undefined ? '' : config.label;
    this.value = config.value;
    this.required = config.required === undefined ? false : config.required;
    this.validators = config.validators === undefined ? [] : config.validators;
  }
}
