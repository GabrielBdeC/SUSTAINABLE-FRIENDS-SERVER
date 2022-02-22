import { CreateUserDto } from '../dtos/createuser.dto';
import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.entity';
import * as argon2 from 'argon2';

export class UserDataConverter {
  public toDto(entity: User): UserDto {
    const response = new UserDto();
    response.setIdentifier(entity.getIdentifier());
    response.setName(entity.getName());
    return response;
  }

  public async toEntity(dto): Promise<User> {
    // need to put :User Dto, but it doesn't work
    const response = new User();
    // response.setName(dto.getName());
    // response.setIdentifier(dto.getIdentifier());
    // response.setEmail(dto.getEmail());
    response.setName(dto.name);
    response.setEmail(dto.email);

    const hash = await argon2.hash(dto.password);
    response.setPassword(hash);

    return response;
  }
}
