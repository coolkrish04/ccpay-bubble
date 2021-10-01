/* eslint-disable no-dupe-keys */
'use strict';
// const CCPBConstants = require('../tests/CCPBAcceptanceTestConstants');

const { I } = inject();

module.exports = {
  locators: {
    service_requests_review: { xpath: '//td[1][@class = "govuk-table__cell whitespace-inherit"]/a[text()="Review"]' },
    payment_success_review: { xpath: '//td[1][@class = "govuk-table__cell whitespace-inherit"]/a[text()="Review"]' }
  },

  async getHeaderValue() {
    const headerValue = await I.grabTextFrom(this.locators.header);
    return headerValue;
  },

  verifyReviewRefundDetailsPage(refundReferenceNumber, reasonForRefund, amountToBeRefunded) {
    I.waitForText('Review Refund details', '5');
    I.see('Payment to be refunded');
    I.see(refundReferenceNumber);
    I.see('Reason for refund');
    I.see(reasonForRefund);
    I.see('Amount to be refunded');
    I.see(`£${amountToBeRefunded}`);
    I.see('Submitted By');
    I.see('Date submitted');
    I.see('What do you want to do with this refund?');
    // I.click('Approve');
    I.click('Submit');
  },

  verifyProcessRefundPage() {
    I.waitForText('Process refund', '5');
    I.see('Why are you making this refund', '5');
    // I.selectOption('','Amended ');
    I.click('Continue');
  },

  verifyReviewAndResubmitRefundPage(refundReferenceNumber, changeRequired) {
    I.waitForText('Review and resubmit refund', '5');
    I.see('Reason for rejection');
    I.see('Refund reference');
    I.see(refundReferenceNumber);
    I.see('Reason for refund');
    I.see('Change');
    // I.see(reason_for_refund);
    I.see('Payment reference');
    I.see('Payment amount');
    if (changeRequired === 'true') {
      I.click('Change');
    } else {
      I.click('Submit refund');
    }
  },

  verifyReviewAndResubmitRefundPage(refundReferenceNumber) {
    I.waitForText('Review and resubmit refund', '5');
    I.see('Reason for rejection');
    I.see('Refund reference');
    I.see(refundReferenceNumber);
    I.see('Reason for refund');
    I.see('Change');
    // I.see(reason_for_refund);
    I.see('Payment reference');
    I.see('Payment amount');
    I.click('Change');
  },

  verifyRefundsDetailsForResubmitRefundPage(refundReferenceNumber) {
    I.waitForText('Refund Details', '5');
    I.see('Refund reference');
    I.see(refundReferenceNumber);
    I.see('Payment to be refunded');
    I.see('Reason For Refund');
    // I.see(reason_for_refund);
    I.see('Amount refunded');
    // I.see(amount_refunded);

    I.see('Refund status history');
    I.see('status');
    I.see('Date and time');
    I.see('User');
    I.see('Notes');
    this.click('Resubmit refund');
  },

  verifyRefundsListPage(title, refundReferenceNumber) {
    I.waitForText('Refund List', '5');

    if (title === 'Approve Refund') {
      I.see('Refunds to be approved');
    } else {
      I.see('Refunds returned to caseworker');
    }

    I.click('Continue');
    I.see('Case ID');
    I.see('Refund reference');
    I.see('Reason');
    I.see('Submitted by');
    I.see('Date Updated');
    I.see('Action');
    I.click('Date Updated');

    if (title === 'Approve Refund') {
      this.click({ xpath: `//matt-cell[.="${refundReferenceNumber}"]/following-sibling::matt-cell/a[.="Process refund"]` });
    } else {
      this.click({ xpath: `//matt-cell[.="${refundReferenceNumber}"]/following-sibling::matt-cell/a[.="Review refund"]` });
    }
  },

  reviewRefundJourney(refundReferenceNumber) {
    verifyRefundsListPage('Review Refund', refundReferenceNumber);
    verifyRefundsDetailsForResubmitRefundPage(refundReferenceNumber);
    verifyReviewAndResubmitRefundPage(refundReferenceNumber, 'true');
    verifyProcessRefundPage();
    verifyReviewAndResubmitRefundPage(refundReferenceNumber, 'false');
    InitiateRefunds.verifyRefundConfirmationPage();
  },

  approveRefundJourney(refundReferenceNumber) {
    verifyRefundsListPage('Approve Refund', refundReferenceNumber);
    verifyReviewRefundsPage();
  }
};
