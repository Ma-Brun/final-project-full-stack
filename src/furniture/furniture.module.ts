import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FurnitureController } from './furniture.controller';
import { FurnitureItem, FurnitureSchema } from './furniture.model';
import { FurnitureService } from './furniture.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FurnitureItem.name, schema: FurnitureSchema },
    ]),
  ],
  controllers: [FurnitureController],
  providers: [FurnitureService],
})
export class FurnitureModule {}
