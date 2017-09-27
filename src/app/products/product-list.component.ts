import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogConfig, MatDialogRef, PageEvent, MatPaginator, MatSort } from '@angular/material';

import { EmptyObservable } from 'rxjs/Observable/EmptyObservable';

import { Product } from './product';
import { ItemContainer } from './item-container';
import { ProductDialogComponent } from './product-dialog.component';
import { ProductService } from './product.service';
import { ProductListDataSource } from './product-list-data-source';
import { SessionService } from '../core/session.service';
import { Session } from '../core/session';

import { ConfirmationDialogComponent } from '../shared/confirmation-dialog.component';
import { AlertService } from '../core/alert.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) private sort: MatSort;

  private updateEmitter: EventEmitter<any>;

  dataSource: ProductListDataSource;

  displayedColumns: string[];

  session: Session;

  constructor(
    private sessionService: SessionService,
    private productService: ProductService,
    private dialog: MatDialog,
    private alertService: AlertService) { }

  ngOnInit() {
    this.session = this.sessionService.getSession();
    this.displayedColumns = ['index', 'name', 'price', 'createdAt'];
    if (this.session.isAdmin()) {
      this.displayedColumns.push('actions');
    }

    this.sort.active = 'createdAt';
    this.sort.direction = 'desc';
    this.updateEmitter = new EventEmitter();
    this.dataSource = new ProductListDataSource(this.productService, this.paginator, this.updateEmitter, this.sort, this.alertService);
  }

  deleteProduct(product: Product) {
    const config = new MatDialogConfig();
    config.data = { title: `Delete product '${product.name}'?` };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, config);

    dialogRef.afterClosed().flatMap(confirmed => {
      return confirmed ? this.productService.deleteProduct(product._id) : new EmptyObservable<string>();
    }).subscribe(
      () => {
        this.alertService.alertSuccess(`Successfully deleted product '${product.name}'.`);
        this.updateEmitter.emit();
      },
      () => this.alertService.alertError('Failed to delete product.')
      );
  }

  addProduct() {
    const config = new MatDialogConfig();
    config.data = { product: new Product, title: 'Add Product' };

    const dialogRef = this.dialog.open(ProductDialogComponent, config);

    dialogRef.afterClosed().flatMap(submittedProduct => {
      return submittedProduct ? this.productService.addProduct(submittedProduct) : new EmptyObservable<Product>();
    }).subscribe(
      (addedProduct) => {
        this.alertService.alertSuccess(`Successfully added product '${addedProduct.name}'.`);
        this.paginator.pageIndex = 0;
        this.updateEmitter.emit();
      },
      () => this.alertService.alertError('Failed to add product.')
      );
  }

  editProduct(product: Product) {
    const config = new MatDialogConfig();
    config.data = { product: Object.assign({}, product), title: 'Edit Product' };

    const dialogRef = this.dialog.open(ProductDialogComponent, config);

    dialogRef.afterClosed().flatMap(submittedProduct => {
      return submittedProduct ? this.productService.editProduct(submittedProduct) : new EmptyObservable<Product>();
    }).subscribe(
      (editedProduct) => {
        this.alertService.alertSuccess(`Successfully updated product '${editedProduct.name}'.`);
        this.updateEmitter.emit();
      },
      () => this.alertService.alertError(`Failed to update product.`)
      );
  }

}
