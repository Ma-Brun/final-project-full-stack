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

  @Delete(':id')
  removeFurnitureItem(@Param('id') id: string): Promise<FurnitureItem> {
    return this.furnitureService.removeFurnitureItem(id);
  }
}
