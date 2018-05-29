/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {PatchOrderFormService} from '../patchOrder.service';
import {Start} from '../states/actions';

@Component({
  selector: 'test-patch-order',
  templateUrl: './patchOrder.component.html',
})

export class PatchOrderComponent implements OnInit {
  constructor(
    public patchOrderFormService: PatchOrderFormService,
    private store: Store<{}>,
  ) {}

  ngOnInit() {
  }

  patchorder() {
    this.store.dispatch(new Start(this.patchOrderFormService.form.value));
  }

}
