import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckChildController } from './health-check-child.controller';

describe('HealthCheckChildController', () => {
  let controller: HealthCheckChildController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckChildController],
    }).compile();

    controller = module.get<HealthCheckChildController>(HealthCheckChildController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
