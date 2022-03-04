import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.entity';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { CompanyUser } from '../models/company-user.entity';

export class UserDataConverter {
  public toDto(entity: User): UserDto {
    const response: UserDto = {} as UserDto;
    response.identifier = entity.identifier;
    response.name = entity.getName();
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

    if (dto.cnpj) {
      const company = new CompanyUser();
      company.setCNPJ(dto.cnpj);
      user.setCompany(company);
    }

    return user;
  }
}
