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
  findAllLifestyleItems(): LifestyleItem[] {
    return this.lifestyleService.findAllLifestyleItems();
  }

  @Post()
  createLifestyleItem(@Body() item: CreateLifestyleItem): LifestyleItem {
    return this.lifestyleService.createLifestyleItem(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateLifestyleItem,
  ): LifestyleItem {
    return this.lifestyleService.updateLifestyleItem(Number(id), item);
  }

  @Delete(':id')
  removeLifestyleItem(@Param('id') id: string): LifestyleItem {
    return this.lifestyleService.removeLifestyleItem(Number(id));
  }
}
