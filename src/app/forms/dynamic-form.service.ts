import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormElement } from './form-element';

@Injectable()
export class DynamicFormService {
  constructor() { }

  toFormGroup(elements: FormElement<any>[]) {
    const group: any = {};

    elements.forEach(element => {
      if (element.required) {
        element.validators.push(Validators.required);
      }
      group[element.key] = new FormControl(element.value, element.validators);
    });

    return new FormGroup(group);
  }
}
