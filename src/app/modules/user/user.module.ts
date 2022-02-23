import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/app/shared/auth/auth.module';
import { LoginController } from './controllers/login.controller';
import { SignUpController } from './controllers/signup.controller';
import { UserDataConverter } from './data-converters/user.data-converter';
import { CompanyUser } from './models/company-user.entity';
import { User } from './models/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, CompanyUser])],
  providers: [UserService, UserDataConverter],
  controllers: [LoginController, SignUpController],
  exports: [UserService, UserDataConverter],
})
export class UsersModule {}
