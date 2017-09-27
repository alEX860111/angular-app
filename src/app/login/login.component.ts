import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormElement } from '../forms/form-element';
import { TextElement, TextElementType } from '../forms/text-element';
import { DynamicFormComponent } from '../forms/dynamic-form.component';

import { AuthenticationService } from '../core/authentication.service';
import { AuthenticationRequest } from '../core/authentication-request';
import { AlertService } from '../core/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(DynamicFormComponent) loginForm: DynamicFormComponent;

  public elements: FormElement<any>[];

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    this.elements = [
      new TextElement('username')
        .withLabel('Username')
        .withRequired()
        .withType(TextElementType.text),
      new TextElement('password')
        .withLabel('Password')
        .withRequired()
        .withType(TextElementType.password)
    ];
  }

  onSubmit() {
    const authenticationRequest = new AuthenticationRequest();
    authenticationRequest.username = this.loginForm.form.value.username;
    authenticationRequest.password = this.loginForm.form.value.password;

    this.authenticationService.authenticate(authenticationRequest).subscribe((session) => {
      this.alertService.alertSuccess(`Successfully logged in as '${session.username}'.`);
      this.router.navigate([this.authenticationService.getRedirectUrl()]);
    }, () => this.alertService.alertError('Login failed.'));
  }

}
