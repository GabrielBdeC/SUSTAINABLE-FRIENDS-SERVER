import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createuser.dto';
import { UserService } from '../services/user.service';

@Controller('api/v1/auth/signup')
export class SignUpController {
  constructor(private userService: UserService) {}

  @Post()
  async signUp(@Body() body: CreateUserDto) {
    return this.userService.signUp(body);
  }
}
