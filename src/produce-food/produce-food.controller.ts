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
  findAllProduceFoodItems(): ProduceFoodItem[] {
    return this.produceFoodService.findAllProduceFoodItems();
  }

  @Post()
  createProduceFoodItem(@Body() item: CreateProduceFoodItem): ProduceFoodItem {
    return this.produceFoodService.createProduceFoodItem(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateProduceFoodItem,
  ): ProduceFoodItem {
    return this.produceFoodService.updateProduceFoodItem(Number(id), item);
  }

  @Delete(':id')
  removeProduceFoodItem(@Param('id') id: string): ProduceFoodItem {
    return this.produceFoodService.removeProduceFoodItem(Number(id));
  }
}
