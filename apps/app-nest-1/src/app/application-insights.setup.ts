/**
 * At the moment the following warning is outputted to the console
 * on app startup:
 * https://github.com/microsoft/ApplicationInsights-node.js/issues/1107
 *
 * Only OpenTelemetry SDK supports uploading source maps:
 * https://learn.microsoft.com/en-us/azure/azure-monitor/app/javascript-sdk-configuration#source-map
 */

import { ApplicationInsightsUtils } from './application-insights.utils';

// console.log(
//   "process.env['AZURE_MONITOR_APPLICATION_INSIGHTS_CONNECTION_STRING']",
//   process.env['AZURE_MONITOR_APPLICATION_INSIGHTS_CONNECTION_STRING'],
// );

ApplicationInsightsUtils.initialize(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env['AZURE_MONITOR_APPLICATION_INSIGHTS_CONNECTION_STRING']!,
);
