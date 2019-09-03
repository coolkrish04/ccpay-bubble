import {Component, OnInit} from '@angular/core';
import {PaymentGroupService} from '../../services/payment-group/payment-group.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IFee} from '../../../../projects/fee-register-search/src/lib/interfaces';

@Component({
  selector: 'app-fee-search',
  templateUrl: './fee-search.component.html',
  styleUrls: ['./fee-search.component.scss']
})
export class FeeSearchComponent implements OnInit {
  selectedFee: any;
  ccdNo: string = null;
  dcnNo: string = null;
  preselectedFee: IFee;
  showFeeDetails = false;
  paymentGroupRef: string = null;
  selectedOption: string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private paymentGroupService: PaymentGroupService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.ccdNo = this.activatedRoute.snapshot.queryParams['ccdCaseNumber'];
      this.paymentGroupRef = this.activatedRoute.snapshot.queryParams['paymentGroupRef'];
      this.dcnNo = this.activatedRoute.snapshot.queryParams['dcn'];
      this.selectedOption = this.activatedRoute.snapshot.queryParams['selectedOption'];
    });
  }

  selectFee(fee: IFee) {
    let paymentGroup;
    if (fee.fee_type === 'fixed' && fee.current_version['volume_amount']) {
      this.preselectedFee = fee;
      this.showFeeDetails = true;
    } else {
      paymentGroup = {
        fees: [{
          code: fee.code,
          version: fee['current_version'].version.toString(),
          'calculated_amount': fee['current_version'].flat_amount.amount.toString(),
          'memo_line': fee['current_version'].memo_line,
          'natural_account_code': fee['current_version'].natural_account_code,
          'ccd_case_number': this.ccdNo,
          jurisdiction1: fee.jurisdiction1['name'],
          jurisdiction2: fee.jurisdiction2['name'],
          description: fee.current_version.description,
          volume: 1
        }]
      };
      this.sendPaymentGroup(paymentGroup);
    }
  }

  onGoBack() {
    this.preselectedFee = null;
    this.showFeeDetails = false;
  }

  selectPreselectedFeeWithVolume(volume: number) {
    const fee = this.preselectedFee;
    const paymentGroup = {
      fees: [{
        code: fee.code,
        version: fee['current_version'].version.toString(),
        'calculated_amount': (fee['current_version']['volume_amount'].amount * volume).toString(),
        'memo_line': fee['current_version'].memo_line,
        'natural_account_code': fee['current_version'].natural_account_code,
        'ccd_case_number': this.ccdNo,
        jurisdiction1: fee.jurisdiction1['name'],
        jurisdiction2: fee.jurisdiction2['name'],
        description: fee.current_version.description,
        volume: volume,
        volume_amount: fee.current_version.volume_amount.amount
      }]
    };

    this.sendPaymentGroup(paymentGroup);
  }

  sendPaymentGroup(paymentGroup: any) {
       const dcnQueryParams = this.dcnNo ? `&dcn=${this.dcnNo}` : '';
    if (this.paymentGroupRef) {

      this.paymentGroupService.putPaymentGroup(this.paymentGroupRef, paymentGroup)
      .then(response => {
        this.router
        .navigateByUrl(`/payment-history/${this.ccdNo}`
            + `?view=fee-summary&selectedOption=${this.selectedOption}&paymentGroupRef=${this.paymentGroupRef}${dcnQueryParams}`);
      })
      .catch(err => {
        this.navigateToServiceFailure();
       });
    } else {
      this.paymentGroupService.postPaymentGroup(paymentGroup).then(paymentGroupReceived => {
        this
          .router
          .navigateByUrl(`/payment-history/${this.ccdNo}`
            + `?view=fee-summary&selectedOption=${this.selectedOption}
            &paymentGroupRef=${JSON.parse(<any>paymentGroupReceived)['data'].payment_group_reference}${dcnQueryParams}`);
      })
      .catch(err => {
        this.navigateToServiceFailure();
       });
    }
  }

  navigateToServiceFailure() {
    this.router.navigateByUrl('/service-failure');
  }

}
