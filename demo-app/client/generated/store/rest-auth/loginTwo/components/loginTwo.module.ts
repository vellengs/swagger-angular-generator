/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {NgModule} from '@angular/core';
import {FormsSharedAngularMaterialModule} from '../../../forms-shared-angular-material.module';
import {FormsSharedModule} from '../../../forms-shared.module';
import {LoginTwoComponent} from './loginTwo.component';

@NgModule({
  imports: [
    FormsSharedModule,
    FormsSharedAngularMaterialModule,
  ],
  declarations: [
    LoginTwoComponent,
  ],
  exports: [
    LoginTwoComponent,
  ],
})
export class LoginTwoModule {}
