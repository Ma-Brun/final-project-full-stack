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
  constructor(private readonly techService: TechService) {}

  @Get()
  findAllTechItems(): Promise<TechItem[]> {
    return this.techService.findAllTechItems();
  }

  @Get('random')
  getRandomTechItem(): Promise<TechItem> {
    return this.techService.randomTechItem();
  }

  @Get(':id')
  findTechByID(@Param('id') id: string): Promise<TechItem> {
    return this.techService.findTechByID(id);
  }

  @Post()
  createTechItem(@Body() item: CreateTechItem): Promise<TechItem> {
    return this.techService.createTechItem(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateTechItem,
  ): Promise<TechItem> {
    return this.techService.updateTechItem(id, item);
  }

  @Delete(':id')
  removeTechItem(@Param('id') id: string): Promise<TechItem> {
    return this.techService.removeTechItem(id);
  }
}
