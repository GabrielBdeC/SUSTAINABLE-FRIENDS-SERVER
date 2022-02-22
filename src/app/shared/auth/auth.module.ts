import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../../modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/modules/user/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
