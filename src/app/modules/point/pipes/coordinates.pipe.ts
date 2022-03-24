import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CoordinatesValidationPipe implements PipeTransform {
  transform(coordinate: any, metadata: ArgumentMetadata) {
    const { data } = metadata;
    if (data === 'lat') {
      const longitude = parseFloat(coordinate);
      if (
        coordinate &&
        typeof coordinate === 'string' &&
        longitude <= 90 &&
        longitude >= -90
      ) {
        return coordinate;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            response: [
              {
                error: 'Bad Request Error',
                message: 'Latitude value must be a number between -90 and 90.',
              },
            ],
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else if (data === 'long') {
      const longitude = parseFloat(coordinate);
      if (
        coordinate &&
        typeof coordinate === 'string' &&
        longitude <= 180 &&
        longitude >= -180
      ) {
        return coordinate;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            response: [
              {
                error: 'Bad Request Error',
                message:
                  'Longitude value must be a number between -180 and 180.',
              },
            ],
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
