import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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
          response: [
            {
              error: 'Not Found',
              message: `Could not find user with email \'${parameters.email}\'.`,
            },
          ],
        },
        HttpStatus.NOT_FOUND,
      );
    } else if (parameters.identifier) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          response: [
            {
              error: 'Not Found',
              message: `Could not find user with identifier \'${parameters.identifier}\'.`,
            },
          ],
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async pointNotFound(identifier) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        response: [
          {
            error: 'NotFoundError',
            message: `Could not find point with identifier \'${identifier}\'`,
          },
        ],
      },
      HttpStatus.NOT_FOUND,
    );
  }

  public async pointItemNotFound(identifier) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        response: [
          {
            error: 'NotFoundError',
            message: `Could not find Point Item with identifier \'${identifier}\'`,
          },
        ],
      },
      HttpStatus.NOT_FOUND,
    );
  }

  public async ItemNonExistent(items: number[], itemsLength: number) {
    if (items.length === 0) {
      throw new HttpException(
        {
          error: {
            message: 'You must provide an item id in order to create a Point.',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      {
        error: {
          message: `Items with the id of \'${items}\' are not on the database. Please, provide an appropriate numbers between 0 and ${itemsLength}.`,
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  public async InappropriateUser() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        response: {
          error: 'NotAuthorizedError',
          message: `Users which aren't from companies are forbidden of creating a delivery point.`,
        },
      },
      HttpStatus.FORBIDDEN,
    );
  }

  public async WithoutDescription() {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        response: [
          {
            error: 'Bad Request',
            message: 'Delivery points must have a description',
          },
        ],
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
