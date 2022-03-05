import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  public async HandleValidationError(input) {
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: input,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  public async HandleDuplicateError(error) {
    const { parameters } = error;
    const email = parameters[0];

    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        // error: `\'${email}\' is already been used. Please choose another.`,
        error: error,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  public async UserNotFoundError(error, email) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: {
          error: 'Not Found',
          message: `Could not find user with email \'${email}\'`,
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
