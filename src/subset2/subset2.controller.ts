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
  CreateSubset2Item,
  Subset2Item,
  UpdateSubset2Item,
} from './subset2.model';
import { Subset2Service } from './subset2.service';

@Controller('tech')
export class Subset2Controller {
  constructor(private readonly subset2Service: Subset2Service) {}

  @Get()
  findAll(): Subset2Item[] {
    return this.subset2Service.findAll();
  }

  @Post()
  create(@Body() item: CreateSubset2Item): Subset2Item {
    return this.subset2Service.create(item);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() item: UpdateSubset2Item,
  ): Subset2Item {
    return this.subset2Service.update(Number(id), item);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Subset2Item {
    return this.subset2Service.remove(Number(id));
  }
}
