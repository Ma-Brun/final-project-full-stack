import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TechController } from './tech.controller';
import { TechItem, TechSchema } from './tech.model';
import { TechService } from './tech.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TechItem.name, schema: TechSchema }]),
  ],
  controllers: [TechController],
  providers: [TechService],
})
export class TechModule {}
