import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as appInsights from 'applicationinsights';

/**
 * Copy-pasted from:
 * https://docs.nestjs.com/exception-filters#catch-everything
 */
@Catch()
export class GlobalCatchAllExceptionFilter extends BaseExceptionFilter {
  override catch(exception: unknown, host: ArgumentsHost): void {
    const client = appInsights.defaultClient;
    client.trackException({
      exception: exception as Error,
    });

    super.catch(exception, host);
  }
}
