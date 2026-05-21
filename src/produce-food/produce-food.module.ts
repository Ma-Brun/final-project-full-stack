import { Module } from '@nestjs/common';
import { ProduceFoodController } from './produce-food.controller';
import { ProduceFoodService } from './produce-food.service';

@Module({
  controllers: [ProduceFoodController],
  providers: [ProduceFoodService],
})
export class ProduceFoodModule {}
