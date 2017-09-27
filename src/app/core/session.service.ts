import { Injectable } from '@angular/core';

import { TokenService } from './token.service';
import { Session } from './session';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class SessionService {

  constructor(private tokenService: TokenService, private jwtHelper: JwtHelper) { }

  getSession(): Session {
    const token = this.tokenService.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const expirationDate = this.jwtHelper.getTokenExpirationDate(token);

      const session = new Session();
      session.username = decodedToken.username;
      session.userId = decodedToken.userId;
      session.role = decodedToken.role;
      session.expirationDate = expirationDate;
      session.loginDate = this.getLoginDate(decodedToken);
      return session;
    } else {
      return null;
    }
  }

  isSessionExpired(session: Session) {
    return session.expirationDate.getTime() < Date.now()
  }

  createSession(token: string): Session {
    this.tokenService.setToken(token);
    const session = this.getSession();
    return session;
  }

  destroySession() {
    this.tokenService.clearToken();
  }

  private getLoginDate(decodedToken: any): Date {
    const date = new Date(0);
    date.setUTCSeconds(decodedToken.iat);
    return date;
  }

}
