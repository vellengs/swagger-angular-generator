/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RestAuthUserUpdateFormService} from '../restAuthUserUpdate.service';
import {Start} from '../states/actions';

@Component({
  selector: 'test-rest-auth-user-update',
  templateUrl: './restAuthUserUpdate.component.html',
})

export class RestAuthUserUpdateComponent implements OnInit {
  constructor(
    public restAuthUserUpdateFormService: RestAuthUserUpdateFormService,
    private store: Store<{}>,
  ) {}

  ngOnInit() {
  }

  restauthuserupdate() {
    this.store.dispatch(new Start(this.restAuthUserUpdateFormService.form.value));
  }

}
