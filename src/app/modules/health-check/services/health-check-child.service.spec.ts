import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckChildService } from './health-check-child.service';

describe('HealthCheckChildService', () => {
  let service: HealthCheckChildService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCheckChildService],
    }).compile();

    service = module.get<HealthCheckChildService>(HealthCheckChildService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
