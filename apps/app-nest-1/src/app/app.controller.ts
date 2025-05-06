import { Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { telemetryClient } from './application-insights.client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData() {
    const appServiceGetDataStartTime = Date.now();
    const result = await this.appService.getData();
    telemetryClient?.trackDependency({
      dependencyTypeName: 'Call',
      name: 'AppService.getData',
      duration: Date.now() - appServiceGetDataStartTime,
      success: true,
    });

    return result;
  }

  @Post('exception')
  async throwException(): Promise<never> {
    const getRootRequestStartTime = Date.now();
    await fetch('http://localhost:3000/api');
    telemetryClient?.trackDependency({
      dependencyTypeName: 'HTTP',
      name: 'getRootRequest',
      target: 'http://localhost:3000/api',
      data: 'GET http://localhost:3000/api',
      duration: Date.now() - getRootRequestStartTime,
      success: true,
    });

    this.appService.throwException();
  }
}
