import { ValidatorFn } from '@angular/forms';

import { FormElement } from './form-element';

export enum TextElementType {
  text,
  password
}

export class TextElement extends FormElement<string> {

  type = 'text';

  constructor(config: {
    key: string,
    label?: string;
    value?: string;
    required?: boolean;
    validators?: ValidatorFn[],
    type?: TextElementType
  }) {
    super(Object.assign({ controlType: 'Input', value: ''}, config));
    this.type = config.type === undefined ? TextElementType[TextElementType.text] : TextElementType[config.type];
  }

}
