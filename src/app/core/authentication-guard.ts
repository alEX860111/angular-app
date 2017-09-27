import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SessionService } from './session.service';
import { Session } from './session';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const session = this.sessionService.getSession();
    if (session) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
