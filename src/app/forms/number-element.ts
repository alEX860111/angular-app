import { ValidatorFn } from '@angular/forms';

import { FormElement, ControlType } from './form-element';

export class NumberElement extends FormElement<number> {

  type = 'number';

  constructor(config: {
    key: string,
    label?: string;
    value?: number;
    required?: boolean;
    validators?: ValidatorFn[]
  }) {
    super(Object.assign({ controlType: ControlType.Input, value: 0}, config));
    this.type = 'number';
  }

}
