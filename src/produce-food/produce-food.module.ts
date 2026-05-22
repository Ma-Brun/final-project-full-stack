import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProduceFoodController } from './produce-food.controller';
import { ProduceFoodItem, ProduceFoodSchema } from './produce-food.model';
import { ProduceFoodService } from './produce-food.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProduceFoodItem.name, schema: ProduceFoodSchema },
    ]),
  ],
  controllers: [ProduceFoodController],
  providers: [ProduceFoodService],
})
export class ProduceFoodModule {}
