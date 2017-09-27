import { Injectable } from '@angular/core';

import { TokenService } from './token.service';
import { Session } from './session';
import { DestroySessionHandler } from './destroy-session-handler';
import { CreateSessionHandler } from './create-session-handler';

import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class SessionService {

  constructor(private tokenService: TokenService, private jwtHelper: JwtHelper) { }

  private createSessionHandlers: Array<CreateSessionHandler> = [];

  private destroySessionHandlers: Array<DestroySessionHandler> = [];


  onCreateSession(createSessionHandler: CreateSessionHandler) {
    this.createSessionHandlers.push(createSessionHandler);
  }

  onDestroySession(destroySessionHandler: DestroySessionHandler) {
    this.destroySessionHandlers.push(destroySessionHandler);
  }

  getSession(): Session {
    const token = this.tokenService.getToken();
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);

    const session = new Session();
    session.username = decodedToken.username;
    session.userId = decodedToken.userId;
    session.role = decodedToken.role;
    session.expirationDate = expirationDate;
    session.loginDate = this.getLoginDate(decodedToken);

    if (this.isSessionExpired(session)) {
      return null;
    }

    return session;
  }

  private isSessionExpired(session: Session) {
    return session.expirationDate.getTime() < Date.now();
  }

  createSession(token: string): Session {
    this.tokenService.setToken(token);
    const session = this.getSession();
    this.createSessionHandlers.forEach(handler => handler(session));
    return session;
  }

  destroySession() {
    this.tokenService.clearToken();
    this.destroySessionHandlers.forEach(handler => handler());
  }

  private getLoginDate(decodedToken: any): Date {
    const date = new Date(0);
    date.setUTCSeconds(decodedToken.iat);
    return date;
  }

}
