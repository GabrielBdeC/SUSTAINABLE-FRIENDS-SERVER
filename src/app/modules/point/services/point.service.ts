import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Point } from '../models/point.entity';
import { UserService } from '../../user/services/user.service';
import { CreatePointDto } from '../dtos/create-point.dto';
import { PointDataConverter } from '../data-converters/point.data-converter';
import { User } from '../../user/models/user.entity';
import { ItemService } from '../../item/services/item.service';
import { DeliveryPoint } from '../models/delivery-point.entity';
import { PointItem } from '../models/ point-item.entity';
import { PointItemDataConverter } from '../data-converters/point-item.data-converter';
import { CollectPoint } from '../models/collect-point.entity';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point) private pointRepository: Repository<Point>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private pointDataConverter: PointDataConverter,
    private pointItemDataConverter: PointItemDataConverter,
    private userService: UserService,
    private itemService: ItemService,
  ) {}

  public async getAll(): Promise<Point[]> {
    return this.pointRepository.find({
      relations: ['_user', '_changedBy', '_collectPoint'],
    });
  }

  public async createPoint(pointDto: CreatePointDto, identifier: string) {
    const user: User = await this.userService.findOne(identifier);
    const point: Point = this.pointDataConverter.toEntity(pointDto);
    const items = await this.itemService.getItemsFromIds(pointDto.items);

    point.user = user;

    const pointItems: PointItem[] = [];
    for (const item of items) {
      const pointItem: PointItem = this.pointItemDataConverter.toEntity(
        item,
        point,
        user,
      );
      pointItems.push(pointItem);
    }
    point.pointItems = pointItems;

    // checks if user is company or personal
    // TODO: need to handle if the user is not correct.
    if (user.getCompany()) {
      const deliveryPoint: DeliveryPoint = new DeliveryPoint();
      deliveryPoint.description = pointDto.description;
      point.deliveryPoint = deliveryPoint;
    } else if (user.getPersonal()) {
      const collectPoint: CollectPoint = new CollectPoint();
      point.collectPoint = collectPoint;
    }

    const new_point = await this.pointRepository.save(point);

    return this.pointDataConverter.toDto(new_point);
  }
}
