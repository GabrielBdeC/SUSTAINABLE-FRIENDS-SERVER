import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../../../shared/auth/auth.service';
import { JwtAuthGuard } from '../../../shared/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../../shared/auth/guards/local-auth.guard';
import { UserDataConverter } from '../data-converters/user.data-converter';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/loginUser.dto';
import { LoginUserValidationGuard } from '../guards/login-user.guard';
import { CreateUserValidationPipe } from '../pipes/create-user-validation.pipe';
import { LoginUserValidationPipe } from '../pipes/login-user-validation.pipe';
import { UserService } from '../services/user.service';

@Controller('auth')
export class UserAuthController {
  constructor(
    private userService: UserService,
    private userDataConverter: UserDataConverter,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body(new CreateUserValidationPipe()) body: CreateUserDto) {
    await this.userService.checkItems(body.preferences);
    const new_user_entity = await this.userDataConverter.toEntity(body);
    const new_user = await this.userService.create(new_user_entity);
    const userDto = this.userDataConverter.toDto(new_user);

    return this.authService.issueJWT(userDto);
  }

  @UseGuards(LoginUserValidationGuard, LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body(new LoginUserValidationPipe()) body: LoginUserDto,
  ) {
    return this.authService.issueJWT(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/protected')
  async protectedRouteTest(@Request() req) {
    console.log(req.user);
    return 'This is the protected route. You can only access it with the JWT token.';
  }
}
