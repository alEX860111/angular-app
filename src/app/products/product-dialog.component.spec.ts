import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

import { DynamicFormsModule } from '../forms/forms.module';
import { ProductDialogComponent } from './product-dialog.component';
import { Product } from './product';

describe('ProductDialogComponent', function () {

  let matDialogRefMock;

  let component: ProductDialogComponent;

  let fixture: ComponentFixture<ProductDialogComponent>;

  let product: Product;

  beforeEach(() => {
    product = { _id: undefined, createdAt: undefined, name: 'myName', price: 42 };
  });

  beforeEach(async(() => {
    matDialogRefMock = jasmine.createSpyObj('matDialogRefMock', ['close']);
    const data = { product: product };

    TestBed.configureTestingModule({
      imports: [DynamicFormsModule, NoopAnimationsModule],
      declarations: [ProductDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: matDialogRefMock },
      {provide: MAT_DIALOG_DATA , useValue: data}, { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductDialogComponent);
      component = fixture.componentInstance;
    });
  }));

  it('title should not be initialized', () => {
    expect(component.title).not.toBeDefined();
  });

  it('submit should close the dialog with the submitted product', () => {
    fixture.detectChanges();
    component.onSubmit(product);
    expect(matDialogRefMock.close).toHaveBeenCalledWith(product);
  });

  it('close should close the dialog', () => {
    component.close();
    expect(matDialogRefMock.close).toHaveBeenCalled();
  });

});
