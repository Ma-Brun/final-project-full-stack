import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import type { PriceSortOrder, StoreItem, StoreOverview } from './app.service';

@Controller()
export class AppController {
  // Connects app routes to app logic.
  constructor(private readonly appService: AppService) {}

  // Returns basic store information.
  @Get()
  getStoreOverview(): StoreOverview {
    return this.appService.getStoreOverview();
  }

  // Returns every item in the store.
  @Get('store/items')
  findAllStoreItems(): Promise<StoreItem[]> {
    return this.appService.findAllStoreItems();
  }

  // Returns every in-stock item.
  @Get('store/items/in-stock')
  findAllInStockStoreItems(): Promise<StoreItem[]> {
    return this.appService.findAllInStockStoreItems();
  }

  // Returns all items sorted by price.
  @Get('store/items/sorted-by-price')
  findAllStoreItemsSortedByPrice(
    @Query('order') order: PriceSortOrder = 'asc',
  ): Promise<StoreItem[]> {
    return this.appService.findAllStoreItemsSortedByPrice(order);
  }
}
