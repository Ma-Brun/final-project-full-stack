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
  findAllFurnitureItems(): FurnitureItem[] {
    return this.furnitureService.findAllFurnitureItems();
  }

  @Post()
  createFurnitureItem(@Body() item: CreateFurnitureItem): FurnitureItem {
    return this.furnitureService.createFurnitureItem(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateFurnitureItem,
  ): FurnitureItem {
    return this.furnitureService.updateFurnitureItem(Number(id), item);
  }

  @Delete(':id')
  removeFurnitureItem(@Param('id') id: string): FurnitureItem {
    return this.furnitureService.removeFurnitureItem(Number(id));
  }
}
