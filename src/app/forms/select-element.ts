import { ValidatorFn } from '@angular/forms';

import { FormElement, ControlType } from './form-element';

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
    super(Object.assign({ controlType: ControlType.Select, value: ''}, config));
    this.options = config.options;
  }

}
