import { Test, TestingModule } from '@nestjs/testing';
import { SharedgameController } from './sharedgame.controller';

describe('SharedgameController', () => {
  let controller: SharedgameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharedgameController],
    }).compile();

    controller = module.get<SharedgameController>(SharedgameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
