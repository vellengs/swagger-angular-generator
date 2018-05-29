/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {LoginTwoFormService} from '../loginTwo.service';
import {Start} from '../states/actions';

@Component({
  selector: 'test-login-two',
  templateUrl: './loginTwo.component.html',
})

export class LoginTwoComponent implements OnInit {
  constructor(
    public loginTwoFormService: LoginTwoFormService,
    private store: Store<{}>,
  ) {}

  ngOnInit() {
  }

  logintwo() {
    this.store.dispatch(new Start(this.loginTwoFormService.form.value));
  }

}
