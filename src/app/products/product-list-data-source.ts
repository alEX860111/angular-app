import { EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { AlertService } from '../core/alert.service';
import { Product } from './product';
import { ProductService } from './product.service';
import { Row } from './row';

export class ProductListDataSource extends DataSource<Row> {

  public _productCount: number;

  constructor(
    private productService: ProductService,
    private paginator: MatPaginator,
    private updateEmitter: EventEmitter<any>,
    private sort: MatSort,
    private alertService: AlertService) {
    super();
  }

  get productCount() {
    return this._productCount;
  }

  connect(): Observable<Row[]> {
    const displayDataChanges = [
      Observable.of(null),
      this.updateEmitter,
      this.paginator.page,
      this.sort.sortChange
    ];

    return Observable.merge(...displayDataChanges).flatMap(() => {
      return this.productService.getProducts(
        this.paginator.pageIndex + 1,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction).catch(error => {
          this.alertService.alertError('Failed to load products.');
          return Observable.throw(error);
        }).map(container => {
          this._productCount = container.count;
          return container.items.map((product, index) => {
            const row = new Row();
            row.product = product;
            row.index = index + 1 + (this.paginator.pageIndex * this.paginator.pageSize);
            return row;
          });
        });
    });
  }

  disconnect() { }

}
