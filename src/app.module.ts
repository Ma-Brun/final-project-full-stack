import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProduceFoodModule } from './produce-food/produce-food.module';
import { TechModule } from './tech/tech.module';
import { ClothingModule } from './clothing/clothing.module';
import { LifestyleModule } from './lifestyle/lifestyle.module';
import { FurnitureModule } from './furniture/furniture.module';
import { MongooseModule } from '@nestjs/mongoose';

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

@Module({
  imports: [...databaseImports, ...featureImports],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
