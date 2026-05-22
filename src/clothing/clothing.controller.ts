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
  constructor(private readonly clothingService: ClothingService) {}

  @Get()
  findAllClothingItems(): Promise<ClothingItem[]> {
    return this.clothingService.findAllClothingItems();
  }

  @Get('random')
  getRandomClothingItem(): Promise<ClothingItem> {
    return this.clothingService.RandomClothingItem();
  }

  @Get('name/:name')
  findClothingByName(@Param('name') name: string): Promise<ClothingItem[]> {
    return this.clothingService.findClothingByName(name);
  }

  @Get('in-stock')
  findInStockClothingItems(): Promise<ClothingItem[]> {
    return this.clothingService.findInStockClothingItems();
  }

  @Get(':id')
  findClothingByID(@Param('id') id: string): Promise<ClothingItem> {
    return this.clothingService.findClothingByID(id);
  }

  @Post()
  createClothingItem(@Body() item: CreateClothingItem): Promise<ClothingItem> {
    return this.clothingService.createClothingItem(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateClothingItem,
  ): Promise<ClothingItem> {
    return this.clothingService.updateClothingItem(id, item);
  }

  @Patch('name/:name')
  updateByName(
    @Param('name') name: string,
    @Body() item: UpdateClothingItem,
  ): Promise<ClothingItem[]> {
    return this.clothingService.updateClothingItemsByName(name, item);
  }

  @Delete('name/:name')
  removeClothingItemsByName(@Param('name') name: string): Promise<ClothingItem[]> {
    return this.clothingService.removeClothingItemsByName(name);
  }

  @Delete(':id')
  removeClothingItem(@Param('id') id: string): Promise<ClothingItem> {
    return this.clothingService.removeClothingItem(id);
  }
}
