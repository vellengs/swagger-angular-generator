/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {OrderFormService} from '../order.service';
import {Start} from '../states/actions';

@Component({
  selector: 'test-order',
  templateUrl: './order.component.html',
})

export class OrderComponent implements OnInit {
  constructor(
    public orderFormService: OrderFormService,
    private store: Store<{}>,
  ) {}

  ngOnInit() {
  }

  order() {
    this.store.dispatch(new Start(this.orderFormService.form.value));
  }

}
