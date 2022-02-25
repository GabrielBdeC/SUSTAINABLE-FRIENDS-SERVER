import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { JwtAuthGuard } from 'src/app/shared/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/app/shared/auth/guards/local-auth.guard';

@Controller('api/v1/auth/login')
export class LoginController {
  constructor(private authService: AuthService) {}

  // @Get()
  // async getAll(): Promise<any> {
  //   return await this.userService.getAll().then((listUser: User[]) => {
  //     return listUser.map((user: User) => {
  //       return this.userDataConverter.toDto(user);
  //     });
  //   });
  // }

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req): Promise<any> {
    return this.authService.issueJWT(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getAll(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected/double')
  getOne(@Request() req) {
    return req.user;
  }
}
