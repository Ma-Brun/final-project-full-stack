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
  constructor(private readonly produceFoodService: ProduceFoodService) {}

  @Get()
  findAllProduceFoodItems(): Promise<ProduceFoodItem[]> {
    return this.produceFoodService.findAllProduceFoodItems();
  }

  @Get('random')
  getRandomProduceFoodItem(): Promise<ProduceFoodItem> {
    return this.produceFoodService.randomProduceFoodItem();
  }

  @Get('name/:name')
  findProduceFoodByName(
    @Param('name') name: string,
  ): Promise<ProduceFoodItem[]> {
    return this.produceFoodService.findProduceFoodByName(name);
  }

  @Get('in-stock')
  findInStockProduceFoodItems(): Promise<ProduceFoodItem[]> {
    return this.produceFoodService.findInStockProduceFoodItems();
  }

  @Get(':id')
  findProduceFoodByID(@Param('id') id: string): Promise<ProduceFoodItem> {
    return this.produceFoodService.findProduceFoodByID(id);
  }

  @Post()
  createProduceFoodItem(
    @Body() item: CreateProduceFoodItem,
  ): Promise<ProduceFoodItem> {
    return this.produceFoodService.createProduceFoodItem(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateProduceFoodItem,
  ): Promise<ProduceFoodItem> {
    return this.produceFoodService.updateProduceFoodItem(id, item);
  }

  @Patch('name/:name')
  updateByName(
    @Param('name') name: string,
    @Body() item: UpdateProduceFoodItem,
  ): Promise<ProduceFoodItem[]> {
    return this.produceFoodService.updateProduceFoodItemsByName(name, item);
  }

  @Delete('name/:name')
  removeProduceFoodItemsByName(
    @Param('name') name: string,
  ): Promise<ProduceFoodItem[]> {
    return this.produceFoodService.removeProduceFoodItemsByName(name);
  }

  @Delete(':id')
  removeProduceFoodItem(@Param('id') id: string): Promise<ProduceFoodItem> {
    return this.produceFoodService.removeProduceFoodItem(id);
  }
}
