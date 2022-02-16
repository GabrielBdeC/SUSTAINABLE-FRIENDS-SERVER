import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';

@Module({
  providers: [],
  controllers: [LoginController],
  exports: [],
})
export class UsersModule {}
