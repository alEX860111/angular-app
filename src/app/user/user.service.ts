import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { ChangePasswordRequest } from './change-password-request';

import { Observable } from 'rxjs/Observable';

import { SessionService } from '../core/session.service';
import { LogService } from '../core/log.service';

@Injectable()
export class UserService {

  private API_URL = '/api/users';

  constructor(private http: AuthHttp, private logService: LogService) { }

  changePassword(changePasswordRequest: ChangePasswordRequest, userId: string): Observable<string> {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify(changePasswordRequest);
    return this.http.put(`${this.API_URL}/${userId}`, body, { headers: headers })
      .map(() => userId)
      .catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    this.logService.logError(error);
    return Observable.throw(error);
  }

}
