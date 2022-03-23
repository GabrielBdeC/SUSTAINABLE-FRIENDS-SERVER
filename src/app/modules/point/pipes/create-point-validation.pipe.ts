import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePointDto } from '../dtos/create-point.dto';

@Injectable()
export class CreatePointValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorsResponse = [];

      for (const e of errors) {
        delete e.children;
        delete e.target;
        delete e.value;
        delete e.property;

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

      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
