import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/app/shared/auth/auth.module';
import { ErrorModule } from 'src/app/shared/errors/error.module';
import { ItemModule } from '../item/item.module';
import { UserAuthController } from './controllers/user-auth.controller';
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
    ItemModule,
  ],
  providers: [UserService, UserDataConverter],
  controllers: [UserController, UserAuthController],
  exports: [UserService, UserDataConverter],
})
export class UsersModule {}
