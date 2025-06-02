import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateDietDto } from '@/diet/dto/create-diet.dto';
import { UpdateDietDto } from '@/diet/dto/update-diet.dto';

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
        }

      }
    });

    const multiply = (quantity: number, macro: number) => quantity * macro

    return dieats.map((diet) => {
      return {
        id: diet.id,
        meal: diet.meal,
        quantity: diet.quantity,
        food: diet.food?.name,
        kcal: multiply(diet.quantity, diet.food!.kcal),
        protein: multiply(diet.quantity, diet.food!.protein),
        fat: multiply(diet.quantity, diet.food!.fat),
        carb: multiply(diet.quantity, diet.food!.carb)
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
