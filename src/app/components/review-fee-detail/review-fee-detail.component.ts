import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FeeModel } from 'src/app/models/FeeModel';
import { PaymentModel } from 'src/app/models/PaymentModel';
import { RemissionModel } from 'src/app/models/RemissionModel';
import { AddFeeDetailService } from 'src/app/services/add-fee-detail/add-fee-detail.service';
import { IResponse } from 'src/app/interfaces/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-fee-detail',
  templateUrl: './review-fee-detail.component.html',
  styleUrls: ['./review-fee-detail.component.scss']
})
export class ReviewFeeDetailComponent implements OnInit {

  feeModels = FeeModel.models;
  payModel = PaymentModel.model;
  remissionModel = RemissionModel.model;
  display_fee_amount: string;
  display_amount_to_pay: string;


  constructor(
    private location: Location,
    private _router: Router,
    private addFeeDetailService: AddFeeDetailService
  ) { }

  ngOnInit() {
    this.setDisplayAmounts();
  }

  private setDisplayAmounts() {
    this.display_amount_to_pay = '£ ' + parseFloat(this.payModel.amount + '').toFixed(2);
    this.display_fee_amount = '£ ' + parseFloat((this.feeModels) ? this.feeModels[0].calculated_amount + '' : '').toFixed(2);
  }

  sendPayDetailsToPayhub() {
    this.addFeeDetailService.sendPayDetailsToPayhub(PaymentModel.cleanModel(this.payModel))
    .subscribe((response: IResponse) => {
      console.log('response: ' + response);
      if (!response.data && response.success) {
        return this._router.navigateByUrl( '/api/addFeeDetail' );
      }
    }, console.log);
  }

  onGoBack() {
    return this.location.back();
  }

}
