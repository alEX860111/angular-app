import { ValidatorFn } from '@angular/forms';

export interface FormElement<T> {
  key: string;
  label: string;
  value: T;
  required: boolean;
  validators: ValidatorFn[];
  controlType: string;
}
