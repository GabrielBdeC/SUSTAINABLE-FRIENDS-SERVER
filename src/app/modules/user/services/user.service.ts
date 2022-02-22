import { Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDataConverter } from '../data-converters/user.data-converter';
import { User } from '../models/user.entity';
import { UserDto } from '../dtos/user.dto';

export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userDataConverter: UserDataConverter,
  ) {}

  public async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async login(@Request() req): Promise<UserDto> {
    return this.userDataConverter.toDto(req.user);
  }

  public async signUp(payload): Promise<UserDto> {
    const userEntity = await this.userDataConverter.toEntity(payload);

    await this.userRepository.insert(userEntity);

    const userDto = this.userDataConverter.toDto(userEntity);

    return userDto;
  }
}
