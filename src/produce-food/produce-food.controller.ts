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
  CreateProduceFoodItem,
  ProduceFoodItem,
  UpdateProduceFoodItem,
} from './produce-food.model';
import { ProduceFoodService } from './produce-food.service';

@Controller('produce-food')
export class ProduceFoodController {
  // Connects produce-food routes to produce-food logic.
  constructor(private readonly produceFoodService: ProduceFoodService) {}

  // Returns all produce-food items.
  @Get()
  findAllProduceFoodItems(): Promise<ProduceFoodItem[]> {
    return this.produceFoodService.findAllProduceFoodItems();
  }

  // Returns one random produce-food item.
  @Get('random')
  getRandomProduceFoodItem(): Promise<ProduceFoodItem> {
    return this.produceFoodService.randomProduceFoodItem();
  }

  // Finds produce-food items by name.
  @Get('name/:name')
  findProduceFoodByName(
    @Param('name') name: string,
  ): Promise<ProduceFoodItem[]> {
    return this.produceFoodService.findProduceFoodByName(name);
  }

  // Returns produce-food items in stock.
  @Get('in-stock')
  findInStockProduceFoodItems(): Promise<ProduceFoodItem[]> {
    return this.produceFoodService.findInStockProduceFoodItems();
  }

  // Finds one produce-food item by ID.
  @Get(':id')
  findProduceFoodByID(@Param('id') id: string): Promise<ProduceFoodItem> {
    return this.produceFoodService.findProduceFoodByID(id);
  }

  // Creates a new produce-food item.
  @Post()
  createProduceFoodItem(
    @Body() item: CreateProduceFoodItem,
  ): Promise<ProduceFoodItem> {
    return this.produceFoodService.createProduceFoodItem(item);
  }

  // Updates one produce-food item by ID.
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateProduceFoodItem,
  ): Promise<ProduceFoodItem> {
    return this.produceFoodService.updateProduceFoodItem(id, item);
  }

  // Updates produce-food items by name.
  @Patch('name/:name')
  updateByName(
    @Param('name') name: string,
    @Body() item: UpdateProduceFoodItem,
  ): Promise<ProduceFoodItem[]> {
    return this.produceFoodService.updateProduceFoodItemsByName(name, item);
  }

  // Deletes produce-food items by name.
  @Delete('name/:name')
  removeProduceFoodItemsByName(
    @Param('name') name: string,
  ): Promise<ProduceFoodItem[]> {
    return this.produceFoodService.removeProduceFoodItemsByName(name);
  }

  // Deletes one produce-food item by ID.
  @Delete(':id')
  removeProduceFoodItem(@Param('id') id: string): Promise<ProduceFoodItem> {
    return this.produceFoodService.removeProduceFoodItem(id);
  }
}
