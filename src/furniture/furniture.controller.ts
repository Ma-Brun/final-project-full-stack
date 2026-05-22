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
  constructor(private readonly furnitureService: FurnitureService) {}

  @Get()
  findAllFurnitureItems(): Promise<FurnitureItem[]> {
    return this.furnitureService.findAllFurnitureItems();
  }

  @Get('random')
  getRandomFurnitureItem(): Promise<FurnitureItem> {
    return this.furnitureService.randomFurnitureItem();
  }

  @Get('name/:name')
  findFurnitureByName(@Param('name') name: string): Promise<FurnitureItem[]> {
    return this.furnitureService.findFurnitureByName(name);
  }

  @Get('in-stock')
  findInStockFurnitureItems(): Promise<FurnitureItem[]> {
    return this.furnitureService.findInStockFurnitureItems();
  }

  @Get(':id')
  findFurnitureByID(@Param('id') id: string): Promise<FurnitureItem> {
    return this.furnitureService.findFurnitureByID(id);
  }

  @Post()
  createFurnitureItem(@Body() item: CreateFurnitureItem): Promise<FurnitureItem> {
    return this.furnitureService.createFurnitureItem(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateFurnitureItem,
  ): Promise<FurnitureItem> {
    return this.furnitureService.updateFurnitureItem(id, item);
  }

  @Patch('name/:name')
  updateByName(
    @Param('name') name: string,
    @Body() item: UpdateFurnitureItem,
  ): Promise<FurnitureItem[]> {
    return this.furnitureService.updateFurnitureItemsByName(name, item);
  }

  @Delete('name/:name')
  removeFurnitureItemsByName(
    @Param('name') name: string,
  ): Promise<FurnitureItem[]> {
    return this.furnitureService.removeFurnitureItemsByName(name);
  }

  @Delete(':id')
  removeFurnitureItem(@Param('id') id: string): Promise<FurnitureItem> {
    return this.furnitureService.removeFurnitureItem(id);
  }
}
