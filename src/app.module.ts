import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProduceFoodModule } from './produce-food/produce-food.module';
import { TechModule } from './tech/tech.module';
import { ClothingModule } from './clothing/clothing.module';
import { LifestyleModule } from './lifestyle/lifestyle.module';
import { FurnitureModule } from './furniture/furniture.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClothingItem, ClothingSchema } from './clothing/clothing.model';
import { FurnitureItem, FurnitureSchema } from './furniture/furniture.model';
import {
  ProduceFoodItem,
  ProduceFoodSchema,
} from './produce-food/produce-food.model';
import { LifestyleItem, LifestyleSchema } from './lifestyle/lifestyle.model';
import { TechItem, TechSchema } from './tech/tech.model';

const databaseImports =
  process.env.NODE_ENV === 'test'
    ? []
    : [
        MongooseModule.forRoot(
          process.env.MONGODB_URI ??
            'mongodb+srv://new-user:4ip72vondyDBCy2c@cluster0.s0upaf7.mongodb.net/Final',
        ),
      ];

const featureImports =
  process.env.NODE_ENV === 'test'
    ? []
    : [
        ProduceFoodModule,
        TechModule,
        ClothingModule,
        LifestyleModule,
        FurnitureModule,
      ];

const storeSearchImports =
  process.env.NODE_ENV === 'test'
    ? []
    : [
        MongooseModule.forFeature([
          { name: ClothingItem.name, schema: ClothingSchema },
          { name: FurnitureItem.name, schema: FurnitureSchema },
          { name: ProduceFoodItem.name, schema: ProduceFoodSchema },
          { name: LifestyleItem.name, schema: LifestyleSchema },
          { name: TechItem.name, schema: TechSchema },
        ]),
      ];

@Module({
  imports: [...databaseImports, ...storeSearchImports, ...featureImports],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
