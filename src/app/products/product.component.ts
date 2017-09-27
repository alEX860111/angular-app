import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { Product } from './product';

import { DynamicFormComponent } from '../forms/dynamic-form.component';
import { FormElement } from '../forms/form-element';
import { TextElement, TextElementType } from '../forms/text-element';
import { NumberElement } from '../forms/number-element';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  @ViewChild(DynamicFormComponent) productForm: DynamicFormComponent;

  public elements: FormElement<any>[];

  public title: string;

  private product: Product;

  constructor(public dialogRef: MdDialogRef<ProductComponent>, @Inject(MD_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.title = this.data.title;
    this.product = this.data.product;
    this.elements = [
      new TextElement('name')
        .withLabel('Name')
        .withRequired()
        .withType(TextElementType.text)
        .withValue(this.product.name),
      new NumberElement('price')
        .withLabel('Price')
        .withRequired()
        .withValue(this.product.price)
    ];
  }

  onSubmit() {
    this.product.name = this.productForm.form.value.name;
    this.product.price = this.productForm.form.value.price;
    this.dialogRef.close(this.product);
  }

  close() {
    this.dialogRef.close();
  }

}
