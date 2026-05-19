import { Module } from '@nestjs/common';
import { Subset2Controller } from './subset2.controller';
import { Subset2Service } from './subset2.service';

@Module({
  controllers: [Subset2Controller],
  providers: [Subset2Service],
})
export class Subset2Module {}
