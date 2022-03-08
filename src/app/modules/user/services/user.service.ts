import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { validateOrReject } from 'class-validator';
import { ErrorHandlerService } from 'src/app/shared/errors/error.service';
import { UserDto } from '../dtos/user.dto';
import { UserDataConverter } from '../data-converters/user.data-converter';
import { IPreferences } from '../constants/preferences.constant';

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

  public async findOne(identifier: string): Promise<any> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.identifier = :identifier', { identifier: identifier })
        .getOneOrFail();
      return user;
    } catch (error) {
      return await this.errorHandlerService.UserNotFoundError(error, {
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
    // const user = await this.userRepository
    //   .createQueryBuilder()
    //   .update(User)
    //   .set({ preferences: preferences })
    //   .where('identifier = :identifier', { identifier: identifier })
    //   .execute();

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.identifier = :identifier', { identifier: identifier })
      .getOneOrFail();

    user.preferences = await this.userDataConverter.handlePreferences(
      preferences,
    );

    await this.userRepository.save(user);

    return this.userDataConverter.toDto(user);

    // const user = await this.userRepository.update(
    //   { identifier: identifier },
    //   { setPreferences(preferences); },
    // );

    return user;
  }
}
