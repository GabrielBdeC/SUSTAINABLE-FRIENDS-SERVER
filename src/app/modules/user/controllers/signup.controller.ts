import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UserDataConverter } from '../data-converters/user.data-converter';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('api/v1/auth/signup')
export class SignUpController {
  constructor(
    private userService: UserService,
    private userDataConverter: UserDataConverter,
    private authService: AuthService,
  ) {}

  @Post()
  async signUp(@Body() body: UserDto) {
    const new_user_entity = await this.userDataConverter.toEntity(body);

    const new_user = await this.userService.create(new_user_entity);

    const userDto = this.userDataConverter.toDto(new_user);

    return this.authService.issueJWT(userDto);
  }
}
