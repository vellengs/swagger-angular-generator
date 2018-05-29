/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedAngularMaterialModule} from '../../../forms-shared-angular-material.module';
import {FormsSharedModule} from '../../../forms-shared.module';
import {PutOrderComponent} from './putOrder.component';

@NgModule({
  imports: [
    FormsSharedModule,
    FormsSharedAngularMaterialModule,
  ],
  declarations: [
    PutOrderComponent,
  ],
  exports: [
    PutOrderComponent,
  ],
})
export class PutOrderModule {}
