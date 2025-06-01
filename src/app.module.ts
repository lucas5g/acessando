import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './food/food.module';
import { PrismaModule } from './prisma/prisma.module';
import { DietModule } from './diet/diet.module';

@Module({
  imports: [FoodModule, PrismaModule, DietModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
