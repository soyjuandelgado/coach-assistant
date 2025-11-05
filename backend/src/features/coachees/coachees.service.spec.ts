import { Test, TestingModule } from '@nestjs/testing';
import { CoacheesService } from './coachees.service';

describe('CoacheesService', () => {
  let service: CoacheesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoacheesService],
    }).compile();

    service = module.get<CoacheesService>(CoacheesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
