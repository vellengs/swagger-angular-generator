/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {LoginFormService} from '../login.service';
import {Start} from '../states/actions';

@Component({
  selector: 'test-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
  constructor(
    public loginFormService: LoginFormService,
    private store: Store<{}>,
  ) {}

  ngOnInit() {
  }

  login() {
    this.store.dispatch(new Start(this.loginFormService.form.value));
  }

}
