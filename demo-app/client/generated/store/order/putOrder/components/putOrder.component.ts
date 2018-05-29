/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {PutOrderFormService} from '../putOrder.service';
import {Start} from '../states/actions';

@Component({
  selector: 'test-put-order',
  templateUrl: './putOrder.component.html',
})

export class PutOrderComponent implements OnInit {
  constructor(
    public putOrderFormService: PutOrderFormService,
    private store: Store<{}>,
  ) {}

  ngOnInit() {
  }

  putorder() {
    this.store.dispatch(new Start(this.putOrderFormService.form.value));
  }

}
