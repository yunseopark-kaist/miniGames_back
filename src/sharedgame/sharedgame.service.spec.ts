import { Test, TestingModule } from '@nestjs/testing';
import { SharedgameService } from './sharedgame.service';

describe('SharedgameService', () => {
  let service: SharedgameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedgameService],
    }).compile();

    service = module.get<SharedgameService>(SharedgameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
