import * as appInsights from 'applicationinsights';

export class ApplicationInsightsUtils {
  static initialize(connectionString: string) {
    /**
     * Setup guide:
     * https://learn.microsoft.com/en-us/azure/azure-monitor/app/nodejs#sdk-configuration
     * https://github.com/microsoft/ApplicationInsights-node.js#configuration
     *
     * Default values:
     * https://github.com/microsoft/ApplicationInsights-node.js/blob/develop/applicationinsights.ts
     */
    appInsights
      .setup(connectionString)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      /*
       * Extended metrics are no longer supported from v3.
       * For v2, see:
       * https://learn.microsoft.com/en-us/azure/azure-monitor/app/nodejs#extended-metrics
       */
      .setAutoCollectPerformance(true, false)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      /* https://learn.microsoft.com/en-us/azure/azure-monitor/app/nodejs#live-metrics */
      .setSendLiveMetrics(false)
      /*https://learn.microsoft.com/en-us/azure/azure-monitor/app/nodejs#browser-sdk-loader */
      .enableWebInstrumentation(false)
      /* https://learn.microsoft.com/en-us/azure/azure-monitor/app/nodejs#distributed-tracing-modes */
      .setDistributedTracingMode(
        appInsights.DistributedTracingModes.AI_AND_W3C,
      );

    appInsights.defaultClient.config.samplingPercentage = 100;
    appInsights.defaultClient.context.tags[
      appInsights.defaultClient.context.keys.cloudRole
    ] = 'backend-app';
    appInsights.defaultClient.commonProperties = {
      environment: 'development',
    };

    appInsights.start();
  }
}
