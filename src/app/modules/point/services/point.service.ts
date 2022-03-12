import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Point } from '../models/point.entity';
import { UserService } from '../../user/services/user.service';
import { CreatePointDto } from '../dtos/create-point.dto';
import { PointDataConverter } from '../data-converters/point.data-converter';
import { User } from '../../user/models/user.entity';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point) private pointRepository: Repository<Point>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private pointDataConverter: PointDataConverter,
    private userService: UserService,
  ) {}

  public async getAll(): Promise<Point[]> {
    return this.pointRepository.find({
      relations: ['_user', '_changedBy', '_collectPoint'],
    });
  }

  public async createPoint(pointDto: CreatePointDto, identifier: string) {
    const user: User = await this.userService.findOne(identifier);
    const point: Point = this.pointDataConverter.toEntity(pointDto, user);
    user.point = [point];

    const new_user = await this.userRepository.save(user);

    return this.pointDataConverter.fromUserToPointDto(new_user);
    return new_user._point[0];
  }
}
