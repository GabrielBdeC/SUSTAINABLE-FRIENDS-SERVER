import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { JwtAuthGuard } from 'src/app/shared/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/app/shared/auth/guards/local-auth.guard';
import { UserDataConverter } from '../data-converters/user.data-converter';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('auth')
export class UserAuthController {
  constructor(
    private userService: UserService,
    private userDataConverter: UserDataConverter,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: UserDto) {
    const new_user_entity = await this.userDataConverter.toEntity(body);
    const new_user = await this.userService.create(new_user_entity);
    const userDto = this.userDataConverter.toDto(new_user);

    return this.authService.issueJWT(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.issueJWT(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/protected')
  async protectedRouteTest(@Request() req) {
    console.log(req.user);
    return 'This is the protected route. You can only access it with the JWT token.';
  }
}
