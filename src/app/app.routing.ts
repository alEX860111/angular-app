import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './core/authentication-guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'settings',
    loadChildren: 'app/user/user.module',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'products',
    loadChildren: 'app/products/products.module',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module'
  }
];

export const routing = RouterModule.forRoot(appRoutes);
