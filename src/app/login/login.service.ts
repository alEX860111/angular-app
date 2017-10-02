import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { LoginRequest } from './login-request';
import { Session } from '../core/session';
import { SessionService } from '../core/session.service';
import { LogService } from '../core/log.service';

@Injectable()
export class LoginService {

  private API_URL = '/api/login';

  constructor(
    private http: Http,
    private sessionService: SessionService,
    private logService: LogService) { }

  isLoggedIn() {
    return this.sessionService.getSession() != null;
  }

  login(loginRequest: LoginRequest): Observable<Session> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify(loginRequest);
    return this.http.post(this.API_URL, body, { headers: headers })
      .map(res => this.sessionService.createSession(res.json().token))
      .catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    this.logService.logError(error);
    return Observable.throw(error);
  }

}
