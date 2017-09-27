import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { DynamicFormsModule } from '../forms/forms.module';
import { ProductComponent } from './product.component';
import { Product } from './product';

describe('ProductDataComponent', function () {

  let mdDialogRefMock;

  let component: ProductComponent;

  let fixture: ComponentFixture<ProductComponent>;

  let product: Product;

  beforeEach(() => {
    product = { _id: undefined, createdAt: undefined, name: 'myName', price: 42 };
  });

  beforeEach(async(() => {
    mdDialogRefMock = jasmine.createSpyObj('mdDialogRefMock', ['close']);
    const data = { product: product };

    TestBed.configureTestingModule({
      imports: [DynamicFormsModule, NoopAnimationsModule],
      declarations: [ProductComponent],
      providers: [{ provide: MdDialogRef, useValue: mdDialogRefMock },
      {provide: MD_DIALOG_DATA , useValue: data}]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductComponent);
      component = fixture.componentInstance;
    });
  }));

  it('title should not be initialized', () => {
    expect(component.title).not.toBeDefined();
  });

  it('submit should close the dialog with the submitted product', () => {
    fixture.detectChanges();
    component.onSubmit();
    expect(mdDialogRefMock.close).toHaveBeenCalledWith(product);
  });

  it('close should close the dialog', () => {
    component.close();
    expect(mdDialogRefMock.close).toHaveBeenCalled();
  });

});
