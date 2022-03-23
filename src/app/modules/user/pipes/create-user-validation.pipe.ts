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
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  async transform(value: CreateUserDto, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object: CreateUserDto = plainToClass(metatype, value);

    // checking if the request contains a CPF or CNPJ value.
    if (object.cpf && object.cnpj) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          response: [
            {
              error: 'Bad Request',
              message: 'User must have only a CPF or a CNPJ.',
            },
          ],
        },
        HttpStatus.BAD_REQUEST,
      );
    } else if (!object.cpf && !object.cnpj) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          response: [
            {
              error: 'Bad Request',
              message: 'User must have a CPF or a CNPJ.',
            },
          ],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // check if CPF and CNPJ are correctly formatted
    if (object.cpf) {
      const cpfIsValid: boolean = this.validateCPF(object.cpf);
      if (!cpfIsValid) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            response: [
              {
                error: 'Bad Request Error',
                message: 'CPF is invalid. Please provide a valid CPF.',
              },
            ],
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        value.cpf = object.cpf.replace(/[^\d]+/g, '');
      }
    } else if (object.cnpj) {
      const cpnjIsValid: boolean = this.validateCNPJ(object.cnpj);
      if (!cpnjIsValid) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            response: [
              {
                error: 'Bad Request Error',
                message: 'CNPJ is invalid. Please provide a valid CNPJ.',
              },
            ],
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        value.cnpj = object.cnpj.replace(/[^\d]+/g, '');
      }
    }

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

  private validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    )
      return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  }

  private validateCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != parseInt(digitos.charAt(1))) return false;

    return true;
  }
}
