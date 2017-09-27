import { NgModule } from '@angular/core';

import { DynamicFormsModule } from '../forms/forms.module';

import { routing } from './products.routing';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list.component';
import { ProductDialogComponent } from './product-dialog.component';
import { ProductService } from './product.service';

@NgModule({
  imports: [routing, DynamicFormsModule],
  declarations: [ProductComponent, ProductListComponent, ProductDialogComponent],
  entryComponents: [ProductDialogComponent],
  providers: [ProductService]
})
export default class ProductsModule { }
