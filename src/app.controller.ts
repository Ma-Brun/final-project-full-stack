import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import type { StoreOverview } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStoreOverview(): StoreOverview {
    return this.appService.getStoreOverview();
  }
}
