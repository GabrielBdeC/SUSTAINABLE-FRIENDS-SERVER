import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckController } from './controllers/health-check.controller';
import { HealthCheck } from './models/health-check.entity';
import { HealthCheckService } from './services/health-check.service';

@Module({
  controllers: [HealthCheckController],
  imports: [TypeOrmModule.forFeature([HealthCheck])],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
