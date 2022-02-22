import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { argon2d } from 'argon2';
import { User } from 'src/app/modules/user/models/user.entity';
import { UserService } from 'src/app/modules/user/services/user.service';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOneOrFail();

    if (user && argon2.verify(user.getPassword(), password)) {
      return user;
    } else if (!argon2.verify(user.getPassword(), password)) {
      throw new BadRequestException(); // fazer uma classe de erros mais específica
    }
  }
}
