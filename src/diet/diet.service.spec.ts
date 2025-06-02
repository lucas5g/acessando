import { Test, TestingModule } from '@nestjs/testing';
import { DietService } from './diet.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('DietService', () => {
  let service: DietService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DietService, PrismaService],
    }).compile();

    service = module.get<DietService>(DietService);
  });

  it('findAll', async () => {
    const res = await service.findAll();
    console.log(res.slice(0, 2));

  });
});
