import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { PreferencesDto } from '../dtos/preferences.dto';

@Injectable()
export class PreferencesValidationPipe implements PipeTransform<any> {
  async transform(value: PreferencesDto, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    // verification of errors
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorsResponse = [];

      // for loop for verification of errors.
      // it contains verifications for children and grandchildren errors
      for (const e of errors) {
        // since we have an nested entity, we need to check if the children have errors
        if (e.children.length > 0) {
          for (const children of e.children) {
            // since we have another nested entity here, we need to check again the children. In this case, it is the grandchildren
            if (children.children.length > 0) {
              for (const grandChildren of children.children) {
                for (const grandGrandChildren of grandChildren.children) {
                  const errorMessage = {
                    error: 'Validation Error',
                    message: grandGrandChildren.constraints,
                  };
                  errorsResponse.push(errorMessage);
                }
              }
            } else {
              const errorMessage = {
                error: 'Validation Error',
                message: children.constraints,
              };
              errorsResponse.push(errorMessage);
            }
          }
        } else {
          const errorMessage = {
            error: 'Validation Error',
            message: e.constraints,
          };
          errorsResponse.push(errorMessage);
        }
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
