import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/modules/user/models/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UserDataConverter } from 'src/app/modules/user/data-converters/user.data-converter';
import { UserDto } from 'src/app/modules/user/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { ErrorHandlerService } from '../errors/error.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userDataConverter: UserDataConverter,
    private jwtService: JwtService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserDto | any> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: email })
        .getOneOrFail();

      if (await argon2.verify(user.getPassword(), password)) {
        const userDto = this.userDataConverter.toDto(user);
        return userDto;
      }
    } catch (error) {
      return this.errorHandlerService.UserNotFoundError(error, email);
    }
  }

  public async issueJWT(userDto: UserDto) {
    const payload = { name: userDto.name, sub: userDto.identifier };
    return {
      access_token: await this.jwtService.signAsync(payload),
      name: userDto.name,
      identifier: userDto.identifier,
    };
  }
}
