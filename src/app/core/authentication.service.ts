import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { AuthenticationRequest } from './authentication-request';
import { Session } from './session';
import { SessionService } from './session.service';
import { LogService } from '../core/log.service';

@Injectable()
export class AuthenticationService {

  private API_URL = 'http://localhost:8080/login';

  private redirectUrl;

  constructor(
    private http: Http,
    private sessionService: SessionService,
    private logService: LogService) {
    this.redirectUrl = '/home';
  }

  setRedirectUrl(redirectUrl: string) {
    this.redirectUrl = redirectUrl;
  }

  getRedirectUrl() {
    return this.redirectUrl;
  }

  authenticate(authenticationRequest: AuthenticationRequest): Observable<Session> {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify(authenticationRequest);
    return this.http.post(this.API_URL, body, { headers: headers })
      .map(res => this.sessionService.createSession(res.json().token))
      .catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    this.logService.logError(error);
    return Observable.throw(error);
  }

}
