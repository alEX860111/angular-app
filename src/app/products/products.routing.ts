import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':id', component: ProductComponent }
];

export const routing = RouterModule.forChild(routes);
