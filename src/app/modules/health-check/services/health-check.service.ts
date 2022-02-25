import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthCheck } from '../models/health-check.entity';

@Injectable()
export class HealthCheckService {
  constructor(
    @InjectRepository(HealthCheck)
    private healthCheckRepository: Repository<HealthCheck>,
  ) {}
  public getAll(): Promise<HealthCheck[]> {
    return this.healthCheckRepository.find();
  }
}
