import { FormElement } from './form-element';
import { ValidatorFn } from '@angular/forms';

interface Option {
  value: string;
  label: string;
}

export class SelectElement extends FormElement<string> {

  options: Option[] = [];

  constructor(config: {
    key: string,
    label?: string;
    value?: string;
    required?: boolean;
    validators?: ValidatorFn[],
    options: Option[]
  }) {
    super(Object.assign({ controlType: 'Select', value: ''}, config));
    this.options = config.options;
  }

}
