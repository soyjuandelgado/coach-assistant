import { Test, TestingModule } from '@nestjs/testing';
import { CoacheesController } from './coachees.controller';

describe('CoacheesController', () => {
  let controller: CoacheesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoacheesController],
    }).compile();

    controller = module.get<CoacheesController>(CoacheesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
