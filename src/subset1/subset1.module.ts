import { Module } from '@nestjs/common';
import { Subset1Controller } from './subset1.controller';
import { Subset1Service } from './subset1.service';

@Module({
  controllers: [Subset1Controller],
  providers: [Subset1Service],
})
export class Subset1Module {}
