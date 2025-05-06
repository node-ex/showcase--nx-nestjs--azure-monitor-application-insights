import { Injectable } from '@nestjs/common';
import { telemetryClient } from './application-insights.client';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string }> {
    const waitStartTime = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    telemetryClient?.trackDependency({
      dependencyTypeName: 'Code',
      name: 'AppService.getData_wait',
      duration: Date.now() - waitStartTime,
      success: true,
    });

    return { message: 'Hello API' };
  }

  throwException(): never {
    throw new Error('Dummy exception thrown');
  }
}
