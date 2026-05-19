import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Subset1Module } from './subset1/subset1.module';
import { Subset2Module } from './subset2/subset2.module';
import { Subset3Module } from './subset3/subset3.module';
import { Subset4Module } from './subset4/subset4.module';
import { Subset5Module } from './subset5/subset5.module';

@Module({
  imports: [
    Subset1Module,
    Subset2Module,
    Subset3Module,
    Subset4Module,
    Subset5Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
