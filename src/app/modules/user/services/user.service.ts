import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { validateOrReject } from 'class-validator';
import { ErrorHandlerService } from 'src/app/shared/errors/error.service';

export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private errorHandlerService: ErrorHandlerService,
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
}
