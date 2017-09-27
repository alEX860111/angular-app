import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { TokenService } from './token.service';

export function authHttpServiceFactory(tokenService: TokenService, http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => tokenService.getToken())
  }), http, options);
}
