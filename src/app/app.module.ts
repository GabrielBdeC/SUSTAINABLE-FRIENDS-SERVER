import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckModule } from './modules/health-check/health-check.module';

@Module({
  imports: [TypeOrmModule.forRoot(), HealthCheckModule],
})
export class AppModule {}
