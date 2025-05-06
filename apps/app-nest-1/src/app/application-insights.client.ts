import type { TelemetryClient } from 'applicationinsights';

export let telemetryClient: TelemetryClient | undefined;

export function setTelemetryClient(client: TelemetryClient) {
  telemetryClient = client;
}
