/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Component, OnInit} from '@angular/core';
import {GoodsService} from '../../../controllers/Goods';
import {GetGoodsListFormService} from './getGoodsList.service';

@Component({
  selector: 'getGoodsList',
  templateUrl: './getGoodsList.component.html',
})

export class GetGoodsListComponent implements OnInit {
  constructor(
    public getGoodsListFormService: GetGoodsListFormService,
    private goodsService: GoodsService,
  ) {}

  ngOnInit() {
  }

  goods() {
    this.goodsService.getGoodsList(this.getGoodsListFormService.form.value);
  }

}
