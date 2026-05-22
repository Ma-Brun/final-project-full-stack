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

  @Delete(':id')
  removeLifestyleItem(@Param('id') id: string): Promise<LifestyleItem> {
    return this.lifestyleService.removeLifestyleItem(id);
  }
}
