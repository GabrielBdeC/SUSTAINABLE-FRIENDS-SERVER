import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDataConverter } from '../data-converters/user.data-converter';
import { User } from '../models/user.entity';
import { CompanyUser } from '../models/company-user.entity';
import { LoginUserDto } from '../dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(CompanyUser)
    private jwtService: JwtService,
  ) {}

  public async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async issueJWT(loginUserDto: LoginUserDto) {
    const payload = { email: loginUserDto.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
    return loginUserDto;
  }
}
