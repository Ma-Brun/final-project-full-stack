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
  CreateSubset3Item,
  Subset3Item,
  UpdateSubset3Item,
} from './subset3.model';
import { Subset3Service } from './subset3.service';

@Controller('clothing')
export class Subset3Controller {
  constructor(private readonly subset3Service: Subset3Service) {}

  @Get()
  findAll(): Subset3Item[] {
    return this.subset3Service.findAll();
  }

  @Post()
  create(@Body() item: CreateSubset3Item): Subset3Item {
    return this.subset3Service.create(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateSubset3Item,
  ): Subset3Item {
    return this.subset3Service.update(Number(id), item);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Subset3Item {
    return this.subset3Service.remove(Number(id));
  }
}
