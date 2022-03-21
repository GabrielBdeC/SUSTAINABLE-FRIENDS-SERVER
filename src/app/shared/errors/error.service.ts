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
    const duplicate_entry = parameters[1];

    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `\'${duplicate_entry}\' has already been used. Please choose another.`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  public async UserNotFoundError(error, parameters) {
    parameters.email = parameters.email || undefined;
    parameters.identifier = parameters.identifier || undefined;

    if (parameters.email) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: {
            error: 'Not Found',
            message: `Could not find user with email \'${parameters.email}\'.`,
          },
        },
        HttpStatus.NOT_FOUND,
      );
    } else if (parameters.identifier) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: {
            error: 'Not Found',
            message: `Could not find user with identifier \'${parameters.identifier}\'.`,
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async ItemNonExistent(items, itemsLength) {
    throw new HttpException(
      {
        error: {
          message: `Items with the id of ${items} are not on the database. Please, provide an appropriate numbers between 0 and ${itemsLength}.`,
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  public async InappropriateUser() {
    throw new HttpException(
      {
        error: {
          message: `Users which aren't from companies are forbidden of creating a delivery point.`,
        },
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
