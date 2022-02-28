import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './shared/auth/auth.module';
import { ErrorModule } from './shared/errors/error.module';
import { PointModule } from './modules/point/point.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    HealthCheckModule,
    UsersModule,
    AuthModule,
    ErrorModule,
    ConfigModule.forRoot(),
    PointModule,
  ],
})
export class AppModule {}
