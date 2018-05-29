/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {DeleteORDERFormService} from '../deleteORDER.service';
import {Start} from '../states/actions';

@Component({
  selector: 'test-delete-o-r-d-e-r',
  templateUrl: './deleteORDER.component.html',
})

export class DeleteORDERComponent implements OnInit {
  constructor(
    public deleteORDERFormService: DeleteORDERFormService,
    private store: Store<{}>,
  ) {}

  ngOnInit() {
  }

  deleteorder() {
    this.store.dispatch(new Start(this.deleteORDERFormService.form.value));
  }

}
