import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateDietDto } from '@/diet/dto/create-diet.dto';
import { UpdateDietDto } from '@/diet/dto/update-diet.dto';
import { MealEnum } from '@/diet/diet.enum';

@Injectable()
export class DietService {
  constructor(private readonly prisma: PrismaService) { }
  create(createDietDto: CreateDietDto) {
    return this.prisma.diet.create({
      data: createDietDto
    });
  }

  async findAll() {
    const dieats = await this.prisma.diet.findMany({
      select: {
        id: true,
        meal: true,
        quantity: true,
        food: {
          select: {
            name: true,
            kcal: true,
            protein: true,
            fat: true,
            carb: true
          }
        },


      },
      orderBy: {
        meal: 'asc'
      }
    });
    const multiply = (quantity: number, macro: number) => quantity * macro

    const dieatsGroupMeal = dieats.reduce((acc, diet) => {
      acc[diet.meal] ??= [];
      acc[diet.meal].push({
        id: diet.id,
        quantity: diet.quantity,
        food: diet.food?.name,
        fat: multiply(diet.quantity, diet.food!.fat),
        carb: multiply(diet.quantity, diet.food!.carb),
        protein: multiply(diet.quantity, diet.food!.protein),
        kcal: multiply(diet.quantity, diet.food!.kcal),
      });
      return acc;
    }, {})
    return dieatsGroupMeal
    // return dieats;


    return dieats.map((diet) => {
      return {
        id: diet.id,
        meal: MealEnum[diet.meal],
        food: diet.food?.name,
        quantity: diet.quantity,
        fat: multiply(diet.quantity, diet.food!.fat),
        carb: multiply(diet.quantity, diet.food!.carb),
        protein: multiply(diet.quantity, diet.food!.protein),
        kcal: multiply(diet.quantity, diet.food!.kcal),
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} diet`;
  }

  update(id: number, updateDietDto: UpdateDietDto) {
    return `This action updates a #${id} diet`;
  }

  remove(id: number) {
    return `This action removes a #${id} diet`;
  }
}
