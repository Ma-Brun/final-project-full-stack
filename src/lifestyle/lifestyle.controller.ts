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
  constructor(private readonly lifestyleService: LifestyleService) {}

  @Get()
  findAllLifestyleItems(): Promise<LifestyleItem[]> {
    return this.lifestyleService.findAllLifestyleItems();
  }

  @Get('random')
  getRandomLifestyleItem(): Promise<LifestyleItem> {
    return this.lifestyleService.randomLifestyleItem();
  }

  @Get('name/:name')
  findLifestyleByName(@Param('name') name: string): Promise<LifestyleItem[]> {
    return this.lifestyleService.findLifestyleByName(name);
  }

  @Get('in-stock')
  findInStockLifestyleItems(): Promise<LifestyleItem[]> {
    return this.lifestyleService.findInStockLifestyleItems();
  }

  @Get(':id')
  findLifestyleByID(@Param('id') id: string): Promise<LifestyleItem> {
    return this.lifestyleService.findLifestyleByID(id);
  }

  @Post()
  createLifestyleItem(@Body() item: CreateLifestyleItem): Promise<LifestyleItem> {
    return this.lifestyleService.createLifestyleItem(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateLifestyleItem,
  ): Promise<LifestyleItem> {
    return this.lifestyleService.updateLifestyleItem(id, item);
  }

  @Patch('name/:name')
  updateByName(
    @Param('name') name: string,
    @Body() item: UpdateLifestyleItem,
  ): Promise<LifestyleItem[]> {
    return this.lifestyleService.updateLifestyleItemsByName(name, item);
  }

  @Delete('name/:name')
  removeLifestyleItemsByName(
    @Param('name') name: string,
  ): Promise<LifestyleItem[]> {
    return this.lifestyleService.removeLifestyleItemsByName(name);
  }

  @Delete(':id')
  removeLifestyleItem(@Param('id') id: string): Promise<LifestyleItem> {
    return this.lifestyleService.removeLifestyleItem(id);
  }
}
