import { CreateFoodDto } from '@/food/dto/create-food.dto';
import { UpdateFoodDto } from '@/food/dto/update-food.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) { }
  create(createFoodDto: CreateFoodDto) {
    return this.prisma.food.create({ data: createFoodDto });
  }

  findAll() {
    return this.prisma.food.findMany();
  }

  findOne(id: number) {
    return this.prisma.food.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return this.prisma.food.delete({ where: { id } });
  }
}
