import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { SessionService } from './session.service';
import { Session } from './session';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const session = this.sessionService.getSession();
    if (session && !this.sessionService.isSessionExpired(session)) {
      return true;
    } else {
      this.authenticationService.setRedirectUrl(state.url);
      this.router.navigate(['/login']);
      return false;
    }
  }

}
