/* eslint-disable */
const CONF = require('config');

const waitForTimeout = parseInt(CONF.e2e.waitForTimeoutValue);
const waitForAction = parseInt(CONF.e2e.waitForActionValue);

exports.config = {
  name: 'ccpay-bubble-acceptance-tests',
  tests: './test/end-to-end/tests/*_test.js',
  // tests: './test/end-to-end/tests/CCPB_BulkScanFunctionality_test.js',
  timeout: 10000,
  output: './output',
  helpers: {
    Puppeteer: {
      url: CONF.e2e.frontendUrl,
      waitForTimeout,
      waitForAction,
      // waitForNavigation: 'networkidle0',
      waitForNavigation: 'domcontentloaded',
      show: false,
      restart: true,
      windowSize: '1024x768',
      keepCookies: false,
      keepBrowserState: true,
      networkIdleTimeout: 5000,
      waitUntil: 'networkidle0',
      timeout: 3000000,
      chrome: {
        ignoreHTTPSErrors: true,
        args: [
          '--no-sandbox',
          // '--proxy-server=proxyout.reform.hmcts.net:8080',
          // '--proxy-bypass-list=*beta*LB.reform.hmcts.net',
          '--start-maximized',
          '--window-size=1024,768'
        ],
        defaultViewport: null
      }
    },
    PuppeteerHelper: {
      "require": "./test/end-to-end/helpers/PuppeteerHelper.js"
    },
    AccessibilityReportingHelper: {
      require: "./test/end-to-end/helpers/AccessibilityReportingHelper.js"
    },
    Mochawesome: { uniqueScreenshotNames: 'true' }
  },
  plugins: {
    pauseOnFail: {},
    retryFailedStep: { enabled: false }
  },
  include: {
    I: './test/end-to-end/pages/steps_file.js',
    CaseSearch: './test/end-to-end/pages/case_search.js',
    CaseTransaction: './test/end-to-end/pages/case_transactions.js',
    FeesSummary: './test/end-to-end/pages/fees_summary.js',
    AddFees: './test/end-to-end/pages/add_fees.js',
    ConfirmAssociation: './test/end-to-end/pages/confirm_association.js',
    CaseTransferred: './test/end-to-end/pages/case_transferred.js',
    CaseUnidentified: './test/end-to-end/pages/case_unidentified.js',
    Remission: './test/end-to-end/pages/remission.js',
    PaymentHistory: './test/end-to-end/pages/payment_history.js',
    InitiateRefunds: './test/end-to-end/pages/initiate_refunds.js',
    ServiceRequests: './test/end-to-end/pages/service_requests.js',
    RefundsList: './test/end-to-end/pages/refunds_list.js',
    Reports: './test/end-to-end/pages/reports.js',
    FailureEventDetails: './test/end-to-end/pages/failure_event_details.js'
  },
  mocha: {
    reporterOptions: {
      mochaFile: 'functional-output/result.xml',
      reportDir: 'functional-output',
      reportFilename: 'ccpay-bubble-e2e-result',
      inlineAssets: true,
      reportTitle: 'PayBubble E2E tests result',
    }
  },
  bootstrap: false
};
