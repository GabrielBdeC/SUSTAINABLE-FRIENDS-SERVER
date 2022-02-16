import { Controller, Post } from '@nestjs/common';

@Controller('api/v1/auth/login')
export class LoginController {
  @Post()
  async login(): Promise<any> {
    return 'This is the login route';
  }
}
