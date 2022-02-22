import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    HealthCheckModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
