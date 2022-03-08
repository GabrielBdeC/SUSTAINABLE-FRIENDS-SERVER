import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.entity';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { CompanyUser } from '../models/company-user.entity';
import { PersonalUser } from '../models/personal-user.entity';
import { IPreferences } from '../constants/preferences.constant';

export class UserDataConverter {
  public toDto(entity: User): UserDto {
    const response: UserDto = {} as UserDto;
    response.identifier = entity.identifier;
    response.name = entity.getName();
    response.preferences = entity.preferences;
    return response;
  }

  public async toEntity(dto: UserDto): Promise<User> {
    // need to put :User Dto, but it doesn't work

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

    const identifier = uuidv4().replace(/-/g, '').toUpperCase(); // colocar no data converter
    user.identifier = identifier;

    // const _preferences: IPreferences = {} as IPreferences;

    // if (dto.preferences.items) {
    //   const items = dto.preferences.items.filter((item) => {
    //     if (item.active) {
    //       const subItems = item.subItems.filter((subItem) => {
    //         if (subItem.active) return subItem;
    //       });
    //       item.subItems = subItems;
    //       return item;
    //     }
    //   });

    //   _preferences.items = items;
    // }

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

    if (preferences.items) {
      const items = preferences.items.filter((item) => {
        if (item.active) {
          const subItems = item.subItems.filter((subItem) => {
            if (subItem.active) return subItem;
          });
          item.subItems = subItems;
          return item;
        }
      });

      _preferences.items = items;
    }

    return _preferences;
  }
}
