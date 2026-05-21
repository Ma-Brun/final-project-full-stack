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
  findAllTechItems(): TechItem[] {
    return this.techService.findAllTechItems();
  }

  @Post()
  createTechItem(@Body() item: CreateTechItem): TechItem {
    return this.techService.createTechItem(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateTechItem,
  ): TechItem {
    return this.techService.updateTechItem(Number(id), item);
  }

  @Delete(':id')
  removeTechItem(@Param('id') id: string): TechItem {
    return this.techService.removeTechItem(Number(id));
  }
}
