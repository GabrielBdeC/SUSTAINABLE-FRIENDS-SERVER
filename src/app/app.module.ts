import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), HealthCheckModule, UsersModule],
})
export class AppModule {}
