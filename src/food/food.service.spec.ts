import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/prisma/prisma.service';
import { FoodService } from '@/food/food.service';
import { CreateFoodDto } from '@/food/dto/create-food.dto';

describe('FoodService', () => {
  let service: FoodService;
  let id: number
  const properties = ['name']

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodService, PrismaService],
    }).compile();

    service = module.get<FoodService>(FoodService);

    const payload: CreateFoodDto = {
      name: 'test',
      kcal: 1,
      protein: 1,
      fat: 1,
      carb: 1
    }

    const res = await service.create(payload);

    expect(res).toMatchObject(payload);

    id = res.id

  });

  afterAll(async () => {
    await service.remove(id);
  })

  it('findAll', async () => {
    const res = await service.findAll();


    for (const property of properties) {
      expect(res[0]).toHaveProperty(property);
    }
  }, 5500)

  it('findOne', async () => {
    const res = await service.findOne(id);

    for (const property of properties) {
      expect(res).toHaveProperty(property);
    }
  });
});
