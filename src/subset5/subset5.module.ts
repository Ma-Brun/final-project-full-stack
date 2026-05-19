import { Module } from '@nestjs/common';
import { Subset5Controller } from './subset5.controller';
import { Subset5Service } from './subset5.service';

@Module({
  controllers: [Subset5Controller],
  providers: [Subset5Service],
})
export class Subset5Module {}
