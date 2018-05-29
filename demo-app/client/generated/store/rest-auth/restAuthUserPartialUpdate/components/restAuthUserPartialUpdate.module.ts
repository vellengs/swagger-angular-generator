/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedAngularMaterialModule} from '../../../forms-shared-angular-material.module';
import {FormsSharedModule} from '../../../forms-shared.module';
import {RestAuthUserPartialUpdateComponent} from './restAuthUserPartialUpdate.component';

@NgModule({
  imports: [
    FormsSharedModule,
    FormsSharedAngularMaterialModule,
  ],
  declarations: [
    RestAuthUserPartialUpdateComponent,
  ],
  exports: [
    RestAuthUserPartialUpdateComponent,
  ],
})
export class RestAuthUserPartialUpdateModule {}
