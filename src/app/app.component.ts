import { Component } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public isLoggedIn = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = event.url !== '/login';
      }
    });
  }

}
