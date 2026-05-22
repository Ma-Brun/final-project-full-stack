import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LifestyleController } from './lifestyle.controller';
import { LifestyleItem, LifestyleSchema } from './lifestyle.model';
import { LifestyleService } from './lifestyle.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LifestyleItem.name, schema: LifestyleSchema },
    ]),
  ],
  controllers: [LifestyleController],
  providers: [LifestyleService],
})
export class LifestyleModule {}
