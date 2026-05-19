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
  CreateSubset1Item,
  Subset1Item,
  UpdateSubset1Item,
} from './subset1.model';
import { Subset1Service } from './subset1.service';

@Controller('produce-food')
export class Subset1Controller {
  constructor(private readonly subset1Service: Subset1Service) {}

  @Get()
  findAll(): Subset1Item[] {
    return this.subset1Service.findAll();
  }

  @Post()
  create(@Body() item: CreateSubset1Item): Subset1Item {
    return this.subset1Service.create(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateSubset1Item,
  ): Subset1Item {
    return this.subset1Service.update(Number(id), item);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Subset1Item {
    return this.subset1Service.remove(Number(id));
  }
}
