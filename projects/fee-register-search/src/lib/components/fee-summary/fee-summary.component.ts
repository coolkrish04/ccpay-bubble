import { Component, OnInit, Input } from '@angular/core';
import { IFee } from 'projects/fee-register-search/src/lib/interfaces';
import { PaymentGroupService } from '../../services/payment-group/payment-group.service';
import { IPaymentGroupModel } from '../../models/PaymentGroupModel';
import { FeeRegisterSearchService } from '../../services/fee-register-search/fee-register-search.service';

@Component({
  selector: 'pay-fee-summary',
  templateUrl: './fee-summary.component.html',
  styleUrls: ['./fee-summary.component.scss']
})
export class FeeSummaryComponent implements OnInit {

  @Input() feeAPIRoot: string;
  @Input() paymentGroupAPIRoot: string;
  @Input() paymentGroupRef: string;

  paymentGroup: IPaymentGroupModel;
  fees: IFee[];

  constructor(
    private paymentGroupService: PaymentGroupService,
    private feeRegisterSearchService: FeeRegisterSearchService
  ) {}

  ngOnInit() {

    this.feeRegisterSearchService.setURL(this.feeAPIRoot);

    this.feeRegisterSearchService.getFees()
      .subscribe(
        (fees: IFee[]) => this.fees = fees
    );

    this.paymentGroupService.setURL(this.paymentGroupAPIRoot);
    this.paymentGroupService.getPaymentGroupByReference(this.paymentGroupRef).subscribe(result => {
      console.log(result);
      this.paymentGroup = result.data;
    });
  }

}
