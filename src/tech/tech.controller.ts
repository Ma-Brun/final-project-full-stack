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
  CreateTechItem,
  TechItem,
  UpdateTechItem,
} from './tech.model';
import { TechService } from './tech.service';

@Controller('tech')
export class TechController {
  // Connects tech routes to tech logic.
  constructor(private readonly techService: TechService) {}

  // Returns all tech items.
  @Get()
  findAllTechItems(): Promise<TechItem[]> {
    return this.techService.findAllTechItems();
  }

  // Returns one random tech item.
  @Get('random')
  getRandomTechItem(): Promise<TechItem> {
    return this.techService.randomTechItem();
  }

  // Finds tech items by name.
  @Get('name/:name')
  findTechByName(@Param('name') name: string): Promise<TechItem[]> {
    return this.techService.findTechByName(name);
  }

  // Returns tech items in stock.
  @Get('in-stock')
  findInStockTechItems(): Promise<TechItem[]> {
    return this.techService.findInStockTechItems();
  }

  // Finds one tech item by ID.
  @Get(':id')
  findTechByID(@Param('id') id: string): Promise<TechItem> {
    return this.techService.findTechByID(id);
  }

  // Creates a new tech item.
  @Post()
  createTechItem(@Body() item: CreateTechItem): Promise<TechItem> {
    return this.techService.createTechItem(item);
  }

  // Updates one tech item by ID.
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateTechItem,
  ): Promise<TechItem> {
    return this.techService.updateTechItem(id, item);
  }

  // Updates tech items by name.
  @Patch('name/:name')
  updateByName(
    @Param('name') name: string,
    @Body() item: UpdateTechItem,
  ): Promise<TechItem[]> {
    return this.techService.updateTechItemsByName(name, item);
  }

  // Deletes tech items by name.
  @Delete('name/:name')
  removeTechItemsByName(@Param('name') name: string): Promise<TechItem[]> {
    return this.techService.removeTechItemsByName(name);
  }

  // Deletes one tech item by ID.
  @Delete(':id')
  removeTechItem(@Param('id') id: string): Promise<TechItem> {
    return this.techService.removeTechItem(id);
  }
}
