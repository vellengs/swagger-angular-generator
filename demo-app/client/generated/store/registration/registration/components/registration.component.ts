/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RegistrationFormService} from '../registration.service';
import {Start} from '../states/actions';

@Component({
  selector: 'test-registration',
  templateUrl: './registration.component.html',
})

export class RegistrationComponent implements OnInit {
  constructor(
    public registrationFormService: RegistrationFormService,
    private store: Store<{}>,
  ) {}

  ngOnInit() {
  }

  registration() {
    this.store.dispatch(new Start(this.registrationFormService.form.value));
  }

}
