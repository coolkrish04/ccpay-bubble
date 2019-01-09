const config = require('config');
const appInsights = require('applicationinsights');

module.exports = {
  enable() {
    const ikey = config.get('appInsights.instrumentationKey');
    console.log('ikey: ' + ikey);
    appInsights.setup(ikey)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      .setInternalLogging(true, true)
      .start();
    return appInsights;
  }
};
