import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';

import { MdDialog, MdDialogConfig, MdDialogRef, PageEvent, MdPaginator, MdSort } from '@angular/material';

import { Product } from './product';
import { ItemContainer } from './item-container';
import { ProductComponent } from './product.component';
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

  @ViewChild(MdPaginator) paginator: MdPaginator;

  @ViewChild(MdSort) private sort: MdSort;

  private updateEmitter: EventEmitter<any>;

  dataSource: ProductListDataSource;

  displayedColumns: string[];

  session: Session;

  constructor(
    private sessionService: SessionService,
    private productService: ProductService,
    private dialog: MdDialog,
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
    const dialogRef: MdDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.title = `Delete product '${product.name}'?`;

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.productService.deleteProduct(product._id).subscribe(
        () => {
          this.alertService.alertSuccess(`Successfully deleted product '${product.name}'.`);
          this.updateEmitter.emit();
        },
        () => this.alertService.alertError('Failed to delete product.')
      );
    });
  }

  addProduct() {
    const config: MdDialogConfig = new MdDialogConfig();
    config.data = { product: new Product, title: 'Add Product' };

    const dialogRef: MdDialogRef<ProductComponent> = this.dialog.open(ProductComponent, config);

    dialogRef.afterClosed().subscribe(submittedProduct => {
      if (!submittedProduct) {
        return;
      }

      this.productService.addProduct(submittedProduct).subscribe(
        (addedProduct) => {
          this.alertService.alertSuccess(`Successfully added product '${addedProduct.name}'.`);
          this.paginator.pageIndex = 0;
          this.updateEmitter.emit();
        },
        () => this.alertService.alertError('Failed to add product.')
      );

    });
  }

  editProduct(product: Product) {
    const config: MdDialogConfig = new MdDialogConfig();
    config.data = { product: Object.assign({}, product), title: 'Edit Product' };

    const dialogRef: MdDialogRef<ProductComponent> = this.dialog.open(ProductComponent, config);

    dialogRef.afterClosed().subscribe(submittedProduct => {
      if (!submittedProduct) {
        return;
      }

      this.productService.editProduct(submittedProduct).subscribe(
        () => {
          this.alertService.alertSuccess(`Successfully updated product '${submittedProduct.name}'.`);
          this.updateEmitter.emit();
        },
        () => this.alertService.alertError(`Failed to update product.`)
      );
    });
  }

}
