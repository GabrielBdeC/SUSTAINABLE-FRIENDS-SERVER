import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.entity';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { CompanyUser } from '../models/company-user.entity';
import { PersonalUser } from '../models/personal-user.entity';
import { IPreferences } from '../constants/preferences.constant';
import { CreateUserDto } from '../dtos/create-user.dto';

export class UserDataConverter {
  public toDto(entity: User): UserDto {
    const response: UserDto = {} as UserDto;
    response.identifier = entity.identifier;
    response.name = entity.getName();
    response.preferences = entity.preferences;

    return response;
  }

  public toDtoWithoutPreferences(entity: User): UserDto {
    const response: UserDto = {} as UserDto;
    response.identifier = entity.identifier;
    response.name = entity.getName();

    return response;
  }

  public async toEntity(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.setName(dto.name);
    user.setEmail(dto.email);

    if (dto.password && typeof dto.password === 'string') {
      const hash = await argon2.hash(dto.password);
      user.setPassword(hash);
    } else {
      user.setPassword(dto.password);
    }

    const identifier = uuidv4().replace(/-/g, '').toUpperCase();
    user.identifier = identifier;

    // check if name item exists on database

    user.preferences = await this.handlePreferences(dto.preferences);

    if (dto.cpf) {
      const personal = new PersonalUser();
      personal.cpf = dto.cpf;
      user.setPersonal(personal);
    } else if (dto.cnpj) {
      const company = new CompanyUser();
      company.cnpj = dto.cnpj;
      user.setCompany(company);
    }

    return user;
  }

  public async handlePreferences(
    preferences: IPreferences,
  ): Promise<IPreferences> {
    const _preferences: IPreferences = {} as IPreferences;

    if (preferences && preferences.items) {
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
