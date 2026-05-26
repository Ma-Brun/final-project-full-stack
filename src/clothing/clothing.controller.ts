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
  CreateClothingItem,
  ClothingItem,
  UpdateClothingItem,
} from './clothing.model';
import { ClothingService } from './clothing.service';

@Controller('clothing')
export class ClothingController {
  // Connects clothing routes to clothing logic.
  constructor(private readonly clothingService: ClothingService) {}

  // Returns all clothing items.
  @Get()
  findAllClothingItems(): Promise<ClothingItem[]> {
    return this.clothingService.findAllClothingItems();
  }

  // Returns one random clothing item.
  @Get('random')
  getRandomClothingItem(): Promise<ClothingItem> {
    return this.clothingService.RandomClothingItem();
  }

  // Finds clothing items by name.
  @Get('name/:name')
  findClothingByName(@Param('name') name: string): Promise<ClothingItem[]> {
    return this.clothingService.findClothingByName(name);
  }

  // Returns clothing items in stock.
  @Get('in-stock')
  findInStockClothingItems(): Promise<ClothingItem[]> {
    return this.clothingService.findInStockClothingItems();
  }

  // Finds one clothing item by ID.
  @Get(':id')
  findClothingByID(@Param('id') id: string): Promise<ClothingItem> {
    return this.clothingService.findClothingByID(id);
  }

  // Creates a new clothing item.
  @Post()
  createClothingItem(@Body() item: CreateClothingItem): Promise<ClothingItem> {
    return this.clothingService.createClothingItem(item);
  }

  // Updates one clothing item by ID.
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateClothingItem,
  ): Promise<ClothingItem> {
    return this.clothingService.updateClothingItem(id, item);
  }

  // Updates clothing items by name.
  @Patch('name/:name')
  updateByName(
    @Param('name') name: string,
    @Body() item: UpdateClothingItem,
  ): Promise<ClothingItem[]> {
    return this.clothingService.updateClothingItemsByName(name, item);
  }

  // Deletes clothing items by name.
  @Delete('name/:name')
  removeClothingItemsByName(@Param('name') name: string): Promise<ClothingItem[]> {
    return this.clothingService.removeClothingItemsByName(name);
  }

  // Deletes one clothing item by ID.
  @Delete(':id')
  removeClothingItem(@Param('id') id: string): Promise<ClothingItem> {
    return this.clothingService.removeClothingItem(id);
  }
}
