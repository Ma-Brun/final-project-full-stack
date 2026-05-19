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
  CreateSubset4Item,
  Subset4Item,
  UpdateSubset4Item,
} from './subset4.model';
import { Subset4Service } from './subset4.service';

@Controller('lifestyle')
export class Subset4Controller {
  constructor(private readonly subset4Service: Subset4Service) {}

  @Get()
  findAll(): Subset4Item[] {
    return this.subset4Service.findAll();
  }

  @Post()
  create(@Body() item: CreateSubset4Item): Subset4Item {
    return this.subset4Service.create(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateSubset4Item,
  ): Subset4Item {
    return this.subset4Service.update(Number(id), item);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Subset4Item {
    return this.subset4Service.remove(Number(id));
  }
}
