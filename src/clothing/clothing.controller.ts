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
  findAllClothingItems(): ClothingItem[] {
    return this.clothingService.findAllClothingItems();
  }

  @Post()
  createClothingItem(@Body() item: CreateClothingItem): ClothingItem {
    return this.clothingService.createClothingItem(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateClothingItem,
  ): ClothingItem {
    return this.clothingService.updateClothingItem(Number(id), item);
  }

  @Delete(':id')
  removeClothingItem(@Param('id') id: string): ClothingItem {
    return this.clothingService.removeClothingItem(Number(id));
  }
}
