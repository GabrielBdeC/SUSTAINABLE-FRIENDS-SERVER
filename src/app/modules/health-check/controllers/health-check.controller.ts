import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HealthCheckService } from '../services/health-check.service';

@Controller('health_check')
export class HealthCheckController {
  constructor(private healthCheckService: HealthCheckService) {}

  @Get()
  public async get(): Promise<string> {
    return this.healthCheckService
      .test()
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          'Database Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      })
      .then(() => {
        return 'OK';
      });
  }
}
