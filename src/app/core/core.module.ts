import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

import { SharedModule } from '../shared/shared.module';

import { AlertService } from './alert.service';
import { AuthenticationGuard } from './authentication-guard';

import { LogService } from './log.service';
import { jwtHelperFactory } from './jwt-helper-factory';
import { authHttpServiceFactory } from './auth-http-service-factory';
import { TokenService } from './token.service';
import { SessionService } from './session.service';
import { StorageService } from './storage.service';
import { WindowService } from './window.service';

@NgModule({
  imports: [SharedModule]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthenticationGuard,
        AlertService,
        LogService,
        SessionService,
        StorageService,
        TokenService,
        WindowService,
        {
          provide: AuthHttp,
          useFactory: authHttpServiceFactory,
          deps: [TokenService, Http, RequestOptions]
        }, {
          provide: JwtHelper,
          useFactory: jwtHelperFactory
        }

      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}


