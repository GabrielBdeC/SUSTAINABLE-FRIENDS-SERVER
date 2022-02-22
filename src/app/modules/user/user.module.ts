import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './controllers/login.controller';
import { SignUpController } from './controllers/signup.controller';
import { UserDataConverter } from './data-converters/user.data-converter';
import { User } from './models/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserDataConverter],
  controllers: [LoginController, SignUpController],
  exports: [UserService],
})
export class UsersModule {}
