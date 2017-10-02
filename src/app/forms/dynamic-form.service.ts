import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormElement } from './form-element';

@Injectable()
export class DynamicFormService {

  toFormGroup(elements: FormElement<any>[]) {
    const group = {};

    elements.forEach(element => {
      if (element.required) {
        element.validators.push(Validators.required);
      }
      group[element.key] = new FormControl(element.value, element.validators);
    });

    return new FormGroup(group);
  }
}
