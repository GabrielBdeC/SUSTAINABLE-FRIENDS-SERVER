import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from 'src/app/shared/auth/auth.service';
import { UserDataConverter } from '../data-converters/user.data-converter';
import { UserDto } from '../dtos/user.dto';
// import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';

@Controller('api/v1/auth/login')
export class LoginController {
  constructor(
    private userService: UserService,
    private userDataConverter: UserDataConverter,
  ) {}

  // @Get()
  // async getAll(): Promise<any> {
  //   return await this.userService.getAll().then((listUser: User[]) => {
  //     return listUser.map((user: User) => {
  //       return this.userDataConverter.toDto(user);
  //     });
  //   });
  // }

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Request() req): Promise<UserDto> {
    return this.userService.login(req);
  }
}
