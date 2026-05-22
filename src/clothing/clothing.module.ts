import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClothingController } from './clothing.controller';
import { ClothingItem, ClothingSchema } from './clothing.model';
import { ClothingService } from './clothing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClothingItem.name, schema: ClothingSchema },
    ]),
  ],
  controllers: [ClothingController],
  providers: [ClothingService],
})
export class ClothingModule {}
