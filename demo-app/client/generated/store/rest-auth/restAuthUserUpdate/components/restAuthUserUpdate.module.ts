/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedAngularMaterialModule} from '../../../forms-shared-angular-material.module';
import {FormsSharedModule} from '../../../forms-shared.module';
import {RestAuthUserUpdateComponent} from './restAuthUserUpdate.component';

@NgModule({
  imports: [
    FormsSharedModule,
    FormsSharedAngularMaterialModule,
  ],
  declarations: [
    RestAuthUserUpdateComponent,
  ],
  exports: [
    RestAuthUserUpdateComponent,
  ],
})
export class RestAuthUserUpdateModule {}
