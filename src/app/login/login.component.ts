import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormElement } from '../forms/form-element';
import { TextElement, TextElementType } from '../forms/text-element';

import { LoginService } from './login.service';
import { LoginRequest } from './login-request';
import { AlertService } from '../core/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public elements: FormElement<any>[];

  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }

    this.elements = [
      new TextElement({
        key: 'username',
        label: 'Username',
        required: true,
        type: TextElementType.text
      }),
      new TextElement({
        key: 'password',
        label: 'Password',
        required: true,
        type: TextElementType.password
      })
    ];
  }

  onSubmit(value) {
    const loginRequest = {
      username: value.username,
      password: value.password
    };

    this.loginService.login(loginRequest).subscribe((session) => {
      this.alertService.alertSuccess(`Successfully logged in as '${session.username}'.`);
      this.router.navigate(['/home']);
    }, () => this.alertService.alertError('Login failed.'));
  }

}
