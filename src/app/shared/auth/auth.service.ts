import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/modules/user/models/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UserDataConverter } from 'src/app/modules/user/data-converters/user.data-converter';
import { UserDto } from 'src/app/modules/user/dtos/user.dto';
import { LoginUserDto } from 'src/app/modules/user/dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userDataConverter: UserDataConverter,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOneOrFail();

    if (user) {
      if (await argon2.verify(user.getPassword(), password)) {
        const userDto = this.userDataConverter.toDto(user);
        return userDto;
      } else {
        throw new BadRequestException();
      }
    } else {
      throw new NotFoundException();
    }

    // public issueJWT(user: User): UserDto {
    //   const payload = { name: userDto.name, identifier: userDto.identifier };
    //   userDto.jwt = this.jwtService.sign(payload);
    //   return userDto;
    // }
  }

  public issueJWT(loginUserDto: LoginUserDto) {
    const payload = { email: loginUserDto.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
    return loginUserDto;
  }
}
