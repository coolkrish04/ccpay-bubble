'use strict';
const CCPBConstants = require('../tests/CCPBAcceptanceTestConstants');
const PaybubbleStaticData = require('../pages/paybubble_static_data');

const { I } = inject();

module.exports = {
  locators: {
    help_with_fees: { xpath: '//*[@id="helpWithFee"]' },
    help_with_fees_awarded: { xpath: '//*[@id="hwfReward"]' },
    incorrect_payment_received: { xpath: '//*[@id="wrongFee"]' },
    unable_to_issue: { xpath: '//*[@id="notIssueCase"]' },
    other_reason: { xpath: '//*[@name="paymentReason" and @id="other"]' },
    other_reason_surplus: { xpath: '//*[@id="otherDeduction"]' },
    contact_the_applicant: { xpath: '//*[@id="holdCase"]' },
    applicant_to_contact: { xpath: '//*[@id="heldCase"]' },
    refund_due: { xpath: '//*[@id="referRefund"]' },
    no_refund_due: { xpath: '//*[@id="noRefund"]' },
    no_case: { xpath: '//*[@id="noCase"]' },
    other_explainatory: { xpath: '//*[@name="paymentExplanation" and @id="other"]' },
    explainatory_comment: { xpath: '//*[@id="moreDetails"]' }


  },

  verifyConfirmAssociationFullPayment(feeCode, volume, totalAmount, amount) {
    I.see('Confirm allocation');
    I.see('Amount to be allocated: '.concat(totalAmount));
    I.see('Code');
    I.see('Description');
    I.see('Volume');
    I.see('Fee amount');
    I.see('Calculated amount');
    I.see('Amount Due');
    I.see(feeCode);
    I.see(PaybubbleStaticData.fee_description[feeCode]);
    I.see(volume);
    I.see(amount);
    I.see('Amount left to be allocated £0.00');
    I.see('Confirm');
  },

  verifyConfirmAssociationShortfallPayment(feeCode, volume,
    allocatedAmount, feeAmount, calculatedAmount, shortfallAmount) {
    I.see('Confirm allocation');
    I.see(`Amount to be allocated: ${allocatedAmount}`);
    // I.see('Amount to be allocated: '.concat(allocatedAmount));
    I.see('Code');
    I.see('Description');
    I.see('Volume');
    I.see('Fee amount');
    I.see('Calculated amount');
    I.see('Amount Due');
    I.see(feeCode);
    I.see(PaybubbleStaticData.fee_description[feeCode]);
    I.see(volume);
    I.see(feeAmount);
    I.see(calculatedAmount);
    I.see('There is an Under payment of '.concat((shortfallAmount)));
    I.see('Provide a reason');
    I.see('Help with Fees (HWF) application declined');
    I.see('Incorrect payment received');
    I.see('Other');
    I.see('Provide an explanatory note');
    I.see('I have put a stop on the case and contacted the applicant requesting the balance of payment');
    I.see('I have put a stop on the case. The applicant needs to be contacted to request the balance of payment');
    I.see('Confirm');
  },

  verifyConfirmAssociationShortfallPaymentErrorMessages() {
    I.see('Provide a reason');
    I.see('Provide an explanatory note');
  },

  selectReasonForShortfall(reason) {
    switch (reason) {
    case 'Help with Fees':
      I.checkOption(this.locators.help_with_fees);
      break;
    case 'Incorrect payment received':
      I.checkOption(this.locators.incorrect_payment_received);
      break;
    case 'Other reason':
      I.checkOption(this.locators.other_reason);
      break;
    default: I.checkOption(this.locators.help_with_fees);
    }
  },

  selectReasonForSurplus(reason) {
    switch (reason) {
    case 'Help with Fees awarded':
      I.checkOption(this.locators.help_with_fees_awarded);
      break;
    case 'Incorrect payment received':
      I.checkOption(this.locators.incorrect_payment_received);
      break;
    case 'Unable to issue case':
      I.checkOption(this.locators.unable_to_issue);
      break;
    case 'Other reason':
      I.checkOption(this.locators.other_reason_surplus);
      break;
    default: I.checkOption(this.locators.help_with_fees_awarded);
    }
  },

  selectExplainatoryNoteShortfall(explainatoryNote, otherComments = 'Auto Comment') {
    switch (explainatoryNote) {
    case 'Contact applicant':
      I.checkOption(this.locators.contact_the_applicant);
      break;
    case 'Applicant needs to be contacted':
      I.checkOption(this.locators.applicant_to_contact);
      break;
    case 'Other explainatory note':
      I.checkOption(this.locators.other_explainatory);
      I.fillField(this.locators.explainatory_comment, otherComments);
      break;
    default: I.checkOption(this.locators.contact_the_applicant);
    }
  },

  selectExplainatoryNoteSurplus(explainatoryNote, otherComments = 'Auto Comment') {
    switch (explainatoryNote) {
    case 'Details in case notes. Refund due':
      I.checkOption(this.locators.refund_due);
      break;
    case 'Details in case notes. No refund due':
      I.checkOption(this.locators.no_refund_due);
      break;
    case 'No case created. Refund due':
      I.checkOption(this.locators.no_refund_due);
      break;
    case 'Other explainatory note':
      I.checkOption(this.locators.other_explainatory);
      I.fillField(this.locators.explainatory_comment, otherComments);
      break;
    default: I.checkOption(this.locators.refund_due);
    }
  },

  selectShortfallReasonExplainatoryAndUser(reason, explainatoryNote) {
    this.selectReasonForShortfall(reason);
    this.selectExplainatoryNoteShortfall(explainatoryNote);
  },

  selectSurplusReasonExplainatoryAndUser(reason, explainatoryNote) {
    this.selectReasonForSurplus(reason);
    this.selectExplainatoryNoteSurplus(explainatoryNote);
  },

  selectShortfallReasonOtherExplainatoryAndUser(reason, explainatoryNote, explainatoryComment) {
    this.selectReasonForShortfall(reason);
    this.selectExplainatoryNoteShortfall(explainatoryNote, explainatoryComment);
  },

  selectSurplusReasonOtherExplainatoryAndUser(reason, explainatoryNote, explainatoryComment) {
    this.selectReasonForSurplus(reason);
    this.selectExplainatoryNoteSurplus(explainatoryNote, explainatoryComment);
  },

  verifyConfirmAssociationSurplusPayment(feeCode, amount, surplusAmount) {
    I.wait(CCPBConstants.fiveSecondWaitTime);
    I.see('Confirm allocation');
    I.see('Amount to be allocated: '.concat(amount));
    I.see('Code');
    I.see('Description');
    I.see('Volume');
    I.see('Fee amount');
    I.see('Calculated amount');
    I.see('Amount Due');
    I.see(feeCode);
    I.see(PaybubbleStaticData.fee_description[feeCode]);
    I.see(amount);
    I.see('There is an Over payment of '.concat(surplusAmount));
    I.see('Provide a reason. This will be used in the Refund process.');
    I.see('Help with Fees (HWF) awarded. Please include the HWF reference number in the explanatory note');
    I.see('Incorrect payment received');
    I.see('Unable to issue case');
    I.see('Other');
    I.see('Provide an explanatory note');
    I.see('Details in case notes. Refund due');
    I.see('Details in case notes. No refund due');
    I.see('No case created. Refund due');
    I.see('Confirm');
  },

  cancelPayment() {
    I.click('Cancel');
    I.wait(CCPBConstants.fiveSecondWaitTime);
  },

  confirmPayment() {
    I.click('Confirm');
  }
};
