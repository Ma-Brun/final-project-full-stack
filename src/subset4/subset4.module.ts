import { Module } from '@nestjs/common';
import { Subset4Controller } from './subset4.controller';
import { Subset4Service } from './subset4.service';

@Module({
  controllers: [Subset4Controller],
  providers: [Subset4Service],
})
export class Subset4Module {}
