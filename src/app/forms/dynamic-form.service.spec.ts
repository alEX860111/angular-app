import { FormElement, ControlType } from './form-element';

import { DynamicFormService } from './dynamic-form.service';

describe('DynamicFormService', () => {

  let service: DynamicFormService;

  beforeEach(() => {
    service = new DynamicFormService();
  });

  it('should convert an empty elements list', () => {
    const group = service.toFormGroup([]);
    const keys = Object.getOwnPropertyNames(group.controls);
    expect(keys).toEqual([]);
  });

  it('should convert an elements list', () => {
    const element1 = new FormElement<string>({ controlType: ControlType.Input, key: 'foo', value: '' });
    const element2 = new FormElement<string>({ controlType: ControlType.Input, key: 'bar', value: '' });

    const group = service.toFormGroup([element1, element2]);

    const keys = Object.getOwnPropertyNames(group.controls);
    expect(keys).toEqual(['foo', 'bar']);
  });

  it('should throw an error if duplicate keys are found', () => {
    const element1 = new FormElement<string>({ controlType: ControlType.Input, key: 'foo', value: '' });
    const element2 = new FormElement<string>({ controlType: ControlType.Input, key: 'foo', value: '' });

    expect(() => {
      service.toFormGroup([element1, element2]);
    }).toThrowError('form configuration error: found duplicate key \'foo\'');
  });

});
