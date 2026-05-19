import { Module } from '@nestjs/common';
import { Subset3Controller } from './subset3.controller';
import { Subset3Service } from './subset3.service';

@Module({
  controllers: [Subset3Controller],
  providers: [Subset3Service],
})
export class Subset3Module {}
