import { Component, OnInit, ViewChild } from '@angular/core';

import { MdSidenav } from '@angular/material';

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

  @ViewChild(MdSidenav) navigation: MdSidenav;

  public session: Session;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.session = this.sessionService.getSession();
  }

  public logout() {
    this.navigation.close();
    this.sessionService.destroySession();
    this.router.navigate(['/login']);
    this.alertService.alertSuccess('Successfully logged out.');
  }

  public toggleNavigation() {
    this.navigation.opened ? this.navigation.close() : this.navigation.open();
  }

}
