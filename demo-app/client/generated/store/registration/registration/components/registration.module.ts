/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedAngularMaterialModule} from '../../../forms-shared-angular-material.module';
import {FormsSharedModule} from '../../../forms-shared.module';
import {RegistrationComponent} from './registration.component';

@NgModule({
  imports: [
    FormsSharedModule,
    FormsSharedAngularMaterialModule,
  ],
  declarations: [
    RegistrationComponent,
  ],
  exports: [
    RegistrationComponent,
  ],
})
export class RegistrationModule {}
