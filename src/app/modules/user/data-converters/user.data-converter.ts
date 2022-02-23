import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.entity';
import * as argon2 from 'argon2';
import { CompanyUser } from '../models/company-user.entity';

export class UserDataConverter {
  public toDto(entity: User): UserDto {
    const response: UserDto = {} as UserDto;
    response.identifier = entity.getIdentifier();
    response.name = entity.getName();
    return response;
  }

  public async toEntity(dto: UserDto): Promise<User> {
    // need to put :User Dto, but it doesn't work

    const user = new User();
    user.setName(dto.name);
    // user.setName(dto.getName())
    user.setEmail(dto.email);

    const hash = await argon2.hash(dto.password);
    user.setPassword(hash);

    return user;
  }
}
