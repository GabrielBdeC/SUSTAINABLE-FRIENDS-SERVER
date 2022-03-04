import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/app/shared/auth/auth.module';
import { ErrorModule } from 'src/app/shared/errors/error.module';
import { UserController } from './controllers/user.controller';
import { UserDataConverter } from './data-converters/user.data-converter';
import { CompanyUser } from './models/company-user.entity';
import { User } from './models/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, CompanyUser]),
    forwardRef(() => AuthModule),
    ErrorModule,
  ],
  providers: [UserService, UserDataConverter],
  controllers: [UserController],
  exports: [UserService, UserDataConverter],
})
export class UsersModule {}
