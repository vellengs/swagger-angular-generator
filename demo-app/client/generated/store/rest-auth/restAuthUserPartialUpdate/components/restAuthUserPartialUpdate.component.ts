/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RestAuthUserPartialUpdateFormService} from '../restAuthUserPartialUpdate.service';
import {Start} from '../states/actions';

@Component({
  selector: 'test-rest-auth-user-partial-update',
  templateUrl: './restAuthUserPartialUpdate.component.html',
})

export class RestAuthUserPartialUpdateComponent implements OnInit {
  constructor(
    public restAuthUserPartialUpdateFormService: RestAuthUserPartialUpdateFormService,
    private store: Store<{}>,
  ) {}

  ngOnInit() {
  }

  restauthuserpartialupdate() {
    this.store.dispatch(new Start(this.restAuthUserPartialUpdateFormService.form.value));
  }

}
