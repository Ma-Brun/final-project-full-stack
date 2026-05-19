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
  CreateSubset5Item,
  Subset5Item,
  UpdateSubset5Item,
} from './subset5.model';
import { Subset5Service } from './subset5.service';

@Controller('furniture')
export class Subset5Controller {
  constructor(private readonly subset5Service: Subset5Service) {}

  @Get()
  findAll(): Subset5Item[] {
    return this.subset5Service.findAll();
  }

  @Post()
  create(@Body() item: CreateSubset5Item): Subset5Item {
    return this.subset5Service.create(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateSubset5Item,
  ): Subset5Item {
    return this.subset5Service.update(Number(id), item);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Subset5Item {
    return this.subset5Service.remove(Number(id));
  }
}
