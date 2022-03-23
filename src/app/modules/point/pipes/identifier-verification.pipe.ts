import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class VerifyIdentifierPipe implements PipeTransform {
  transform(value: string) {
    if (/^[0-9A-F]{32}$/i.test(value)) {
      return value;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          response: [
            {
              error: 'Bad Request',
              message: 'Identifier invalid',
            },
          ],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
