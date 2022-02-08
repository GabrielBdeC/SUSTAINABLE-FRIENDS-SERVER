import { HealthCheckDto } from './health-check.dto';

describe('HealthCheckDto', () => {
  it('should be defined', () => {
    expect(new HealthCheckDto()).toBeDefined();
  });
});
