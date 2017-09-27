import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Session } from '../core/session';
import { SessionService } from '../core/session.service';
import { AlertService } from '../core/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public session: Session;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.session = this.sessionService.getSession();
    this.sessionService.onCreateSession((session) => {
      this.session = session;
    });
    this.sessionService.onDestroySession(() => {
      this.session = null;
    });
  }

  public logout() {
    this.sessionService.destroySession();
    this.router.navigate(['/login']);
    this.alertService.alertSuccess('Successfully logged out.');
  }

}
