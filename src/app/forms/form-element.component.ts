import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormElement } from './form-element';

@Component({
  selector: 'app-dynamic-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent {

  @Input() element: FormElement<any>;

  @Input() form: FormGroup;

  get errorMessages() {
    const messages = [];
    for (const errorKey in this.form.controls[this.element.key].errors) {
      if (errorKey === 'required') {
        messages.push(errorKey);
      } else {
        messages.push(this.form.controls[this.element.key].errors[errorKey]);
      }
    }
    return messages;
  }

}
