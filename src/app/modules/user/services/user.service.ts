import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { validateOrReject } from 'class-validator';
import { ErrorHandlerService } from 'src/app/shared/errors/error.service';
import { UserDto } from '../dtos/user.dto';
import { UserDataConverter } from '../data-converters/user.data-converter';
import { IPreferences } from '../constants/preferences.constant';
import { HttpException } from '@nestjs/common';

export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private errorHandlerService: ErrorHandlerService,
    private userDataConverter: UserDataConverter,
  ) {}

  public async getAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['personal'],
    });
  }

  public async create(user: User): Promise<User | any> {
    try {
      await validateOrReject(user, {
        validationError: {
          target: false,
        },
      });
    } catch (errors) {
      return this.errorHandlerService.HandleValidationError(errors);
    }
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      return this.errorHandlerService.HandleDuplicateError(err);
    }
  }

  public async findOne(identifier: string): Promise<User | any> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.personal', 'personal')
        .leftJoinAndSelect('user.company', 'company')
        .where('user.identifier = :identifier', { identifier: identifier })
        .getOneOrFail();
      return user;
    } catch (error) {
      await this.errorHandlerService.UserNotFoundError(error, {
        identifier: identifier,
      });
    }
  }

  public async getPreferences(userId: string): Promise<UserDto> {
    const user = await this.findOne(userId);
    return this.userDataConverter.toDto(user);
  }

  public async postPreference(
    identifier: string,
    preferences: IPreferences,
  ): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.identifier = :identifier', { identifier: identifier })
      .getOneOrFail();

    user.preferences = await this.userDataConverter.handlePreferences(
      preferences,
    );

    await this.userRepository.save(user);

    return this.userDataConverter.toDto(user);
  }

  public async getSingleUser(identifier: string) {
    const user = await this.findOne(identifier);
    const user_dto = this.userDataConverter.toDto(user);
    return user_dto;
  }
}
