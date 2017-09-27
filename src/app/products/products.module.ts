import { NgModule } from '@angular/core';

import { DynamicFormsModule } from '../forms/forms.module';

import { routing } from './products.routing';
import { ProductListComponent } from './product-list.component';
import { ProductComponent } from './product.component';
import { ProductService } from './product.service';

@NgModule({
  imports: [ routing, DynamicFormsModule ],
  declarations: [ ProductListComponent, ProductComponent ],
  entryComponents: [ ProductComponent ],
  providers: [ ProductService ]
})
export default class ProductsModule { }
