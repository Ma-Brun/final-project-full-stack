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
  CreateFurnitureItem,
  FurnitureItem,
  UpdateFurnitureItem,
} from './furniture.model';
import { FurnitureService } from './furniture.service';

@Controller('furniture')
export class FurnitureController {
  // Connects furniture routes to furniture logic.
  constructor(private readonly furnitureService: FurnitureService) {}

  // Returns all furniture items.
  @Get()
  findAllFurnitureItems(): Promise<FurnitureItem[]> {
    return this.furnitureService.findAllFurnitureItems();
  }

  // Returns one random furniture item.
  @Get('random')
  getRandomFurnitureItem(): Promise<FurnitureItem> {
    return this.furnitureService.randomFurnitureItem();
  }

  // Finds furniture items by name.
  @Get('name/:name')
  findFurnitureByName(@Param('name') name: string): Promise<FurnitureItem[]> {
    return this.furnitureService.findFurnitureByName(name);
  }

  // Returns furniture items in stock.
  @Get('in-stock')
  findInStockFurnitureItems(): Promise<FurnitureItem[]> {
    return this.furnitureService.findInStockFurnitureItems();
  }

  // Finds one furniture item by ID.
  @Get(':id')
  findFurnitureByID(@Param('id') id: string): Promise<FurnitureItem> {
    return this.furnitureService.findFurnitureByID(id);
  }

  // Creates a new furniture item.
  @Post()
  createFurnitureItem(@Body() item: CreateFurnitureItem): Promise<FurnitureItem> {
    return this.furnitureService.createFurnitureItem(item);
  }

  // Updates one furniture item by ID.
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateFurnitureItem,
  ): Promise<FurnitureItem> {
    return this.furnitureService.updateFurnitureItem(id, item);
  }

  // Updates furniture items by name.
  @Patch('name/:name')
  updateByName(
    @Param('name') name: string,
    @Body() item: UpdateFurnitureItem,
  ): Promise<FurnitureItem[]> {
    return this.furnitureService.updateFurnitureItemsByName(name, item);
  }

  // Deletes furniture items by name.
  @Delete('name/:name')
  removeFurnitureItemsByName(
    @Param('name') name: string,
  ): Promise<FurnitureItem[]> {
    return this.furnitureService.removeFurnitureItemsByName(name);
  }

  // Deletes one furniture item by ID.
  @Delete(':id')
  removeFurnitureItem(@Param('id') id: string): Promise<FurnitureItem> {
    return this.furnitureService.removeFurnitureItem(id);
  }
}
