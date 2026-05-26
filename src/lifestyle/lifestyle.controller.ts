import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type {
  CreateLifestyleItem,
  LifestyleItem,
  UpdateLifestyleItem,
} from './lifestyle.model';
import { LifestyleService } from './lifestyle.service';

@Controller('lifestyle')
export class LifestyleController {
  // Connects lifestyle routes to lifestyle logic.
  constructor(private readonly lifestyleService: LifestyleService) {}

  // Returns all lifestyle items.
  @Get()
  findAllLifestyleItems(): Promise<LifestyleItem[]> {
    return this.lifestyleService.findAllLifestyleItems();
  }

  // Returns one random lifestyle item.
  @Get('random')
  getRandomLifestyleItem(): Promise<LifestyleItem> {
    return this.lifestyleService.randomLifestyleItem();
  }

  // Finds lifestyle items by name.
  @Get('name/:name')
  findLifestyleByName(@Param('name') name: string): Promise<LifestyleItem[]> {
    return this.lifestyleService.findLifestyleByName(name);
  }

  // Returns lifestyle items in stock.
  @Get('in-stock')
  findInStockLifestyleItems(): Promise<LifestyleItem[]> {
    return this.lifestyleService.findInStockLifestyleItems();
  }

  // Finds one lifestyle item by ID.
  @Get(':id')
  findLifestyleByID(@Param('id') id: string): Promise<LifestyleItem> {
    return this.lifestyleService.findLifestyleByID(id);
  }

  // Creates a new lifestyle item.
  @Post()
  createLifestyleItem(@Body() item: CreateLifestyleItem): Promise<LifestyleItem> {
    return this.lifestyleService.createLifestyleItem(item);
  }

  // Updates one lifestyle item by ID.
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateLifestyleItem,
  ): Promise<LifestyleItem> {
    return this.lifestyleService.updateLifestyleItem(id, item);
  }

  // Updates lifestyle items by name.
  @Patch('name/:name')
  updateByName(
    @Param('name') name: string,
    @Body() item: UpdateLifestyleItem,
  ): Promise<LifestyleItem[]> {
    return this.lifestyleService.updateLifestyleItemsByName(name, item);
  }

  // Deletes lifestyle items by name.
  @Delete('name/:name')
  removeLifestyleItemsByName(
    @Param('name') name: string,
  ): Promise<LifestyleItem[]> {
    return this.lifestyleService.removeLifestyleItemsByName(name);
  }

  // Deletes one lifestyle item by ID.
  @Delete(':id')
  removeLifestyleItem(@Param('id') id: string): Promise<LifestyleItem> {
    return this.lifestyleService.removeLifestyleItem(id);
  }
}
