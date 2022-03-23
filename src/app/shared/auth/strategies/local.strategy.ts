import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDto } from 'src/app/modules/user/dtos/user.dto';
import { LoginUserDto } from 'src/app/modules/user/dtos/loginUser.dto';
import { validate } from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<UserDto> {
    const userPreValidate: LoginUserDto = new LoginUserDto();
    userPreValidate.email = email;
    userPreValidate.password = password;

    const errors = await validate(userPreValidate);
    if (errors.length > 0) {
      const errorsResponse = [];
      for (const e of errors) {
        const errorMessage = {
          error: 'Validation Error',
          message: e.constraints,
        };
        errorsResponse.push(errorMessage);
      }

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          response: errorsResponse,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
