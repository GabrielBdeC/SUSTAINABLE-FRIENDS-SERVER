import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.entity';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { CompanyUser } from '../models/company-user.entity';
import { PersonalUser } from '../models/personal-user.entity';
import { IPreferences } from '../constants/preferences.constant';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDataConverter {
  public toDto(entity: User): UserDto {
    const response: UserDto = {} as UserDto;
    response.identifier = entity.identifier;
    response.name = entity.getName();
    response.preferences = entity.preferences;

    if (entity.getCompany() === null) {
      response.isPersonal = true;
    } else {
      response.isPersonal = false;
    }

    return response;
  }

  public async toEntity(dto: UserDto): Promise<User> {
    const user = new User();
    user.setName(dto.name);
    // user.setName(dto.getName())
    user.setEmail(dto.email);

    if (dto.password && typeof dto.password === 'string') {
      const hash = await argon2.hash(dto.password);
      user.setPassword(hash);
    } else {
      user.setPassword(dto.password);
    }

    const identifier = uuidv4().replace(/-/g, '').toUpperCase();
    user.identifier = identifier;

    if (!dto.cnpj && !dto.cpf) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: {
            message: 'The user must have either a CPF or CNPJ',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    user.preferences = await this.handlePreferences(dto.preferences);

    if (dto.cpf) {
      const personal = new PersonalUser();
      personal.cpf = dto.cpf;
      user.setPersonal(personal);
    } else if (dto.cnpj) {
      const company = new CompanyUser();
      company.cnpj = dto.cnpj;
      user.setCompany(company);
      // if (dto.preferences) {
      //   throw new HttpException(
      //     {
      //       status: HttpStatus.BAD_REQUEST,
      //       error: {
      //         message:
      //           'The user which has a CNPJ cannot have preferences property',
      //       },
      //     },
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
    }

    return user;
  }

  public async handlePreferences(
    preferences: IPreferences,
  ): Promise<IPreferences> {
    const _preferences: IPreferences = {} as IPreferences;

    if (preferences.items) {
      const items = preferences.items.filter((item) => {
        if (item.active) {
          return item;
        }
      });

      _preferences.items = items;
    }

    return _preferences;
  }
}
