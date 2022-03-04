import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('auth')
export class UserAuthController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signUp(@Body() body: UserDto) {
    return body;
  }
}
