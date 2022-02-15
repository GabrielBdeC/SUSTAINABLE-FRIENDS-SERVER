import { Controller, Get, Param } from '@nestjs/common';
import { HealthCheckDataConverter } from '../data-converters/health-check.data-converter';
import { HealthCheckDto } from '../dtos/health-check.dto';
import { HealthCheck } from '../models/health-check.entity';
import { HealthCheckService } from '../services/health-check.service';

@Controller('health_check')
export class HealthCheckController {
  constructor(
    private healthCheckService: HealthCheckService,
    private healthCheckDataConverter: HealthCheckDataConverter,
  ) {}

  @Get()
  public async getAll(): Promise<HealthCheckDto[]> {
    return await this.healthCheckService
      .getAll()
      .then((listHealthCheck: HealthCheck[]) => {
        return listHealthCheck.map((healthCheck: HealthCheck) => {
          return this.healthCheckDataConverter.toDto(healthCheck);
        });
      });
  }

  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<HealthCheckDto> {
    return await this.healthCheckService
      .getOne(id)
      .then((healthCheck: HealthCheck) => {
        return this.healthCheckDataConverter.toDto(healthCheck);
      });
  }
}
