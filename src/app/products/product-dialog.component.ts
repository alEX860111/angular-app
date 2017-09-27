import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Product } from './product';

import { FormElement } from '../forms/form-element';
import { TextElement, TextElementType } from '../forms/text-element';
import { NumberElement } from '../forms/number-element';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html'
})
export class ProductDialogComponent implements OnInit {

  public elements: FormElement<any>[];

  public title: string;

  private product: Product;

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

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

  onSubmit(value) {
    this.product.name = value.name;
    this.product.price = value.price;
    this.dialogRef.close(this.product);
  }

  close() {
    this.dialogRef.close();
  }

}
