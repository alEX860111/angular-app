import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormElement } from './form-element';

@Injectable()
export class DynamicFormService {

  toFormGroup(elements: FormElement<any>[]) {
    const group = {};

    elements.forEach(element => {
      if (group.hasOwnProperty(element.key)) {
        throw new Error(`form configuration error: found duplicate key '${element.key}'`);
      }
      group[element.key] = this.toFormControl(element);
    });

    return new FormGroup(group);
  }

  private toFormControl(element: FormElement<any>) {
    const validators = element.required ? element.validators.concat([Validators.required]) : element.validators;
    return new FormControl(element.value, validators);
  }
}
