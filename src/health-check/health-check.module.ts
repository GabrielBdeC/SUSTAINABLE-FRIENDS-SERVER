import { Module } from '@nestjs/common';
import { HealthCheckService } from './services/health-check.service';
import { HealthCheckChildService } from './services/health-check-child.service';
import { HealthCheckController } from './controllers/health-check.controller';
import { HealthCheckChildController } from './controllers/health-check-child.controller';

@Module({
  providers: [HealthCheckService, HealthCheckChildService],
  controllers: [HealthCheckController, HealthCheckChildController]
})
export class HealthCheckModule { }
