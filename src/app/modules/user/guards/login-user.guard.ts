import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoginUserDto } from '../dtos/loginUser.dto';

@Injectable()
export class LoginUserValidationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;
    return this.validatebody(body);
  }

  validatebody(body: LoginUserDto) {
    if (!body.email) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          response: [
            {
              error: 'Bad Request Error',
              message:
                'Request object for login route must have an email property inside body.',
            },
          ],
        },
        HttpStatus.BAD_REQUEST,
      );
    } else if (!body.password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          response: [
            {
              error: 'Bad Request Error',
              message:
                'Request object for login route must have a password property inside body.',
            },
          ],
        },
        HttpStatus.BAD_REQUEST,
      );
    } else if (!body.email && !body.password) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          response: [
            {
              error: 'Bad Request Error',
              message:
                'Request object for login route must have an email and a password property inside body.',
            },
          ],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
