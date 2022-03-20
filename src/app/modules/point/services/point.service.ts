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
import { Item } from '../../item/models/item.entity';
import { ErrorHandlerService } from 'src/app/shared/errors/error.service';
import { PointDto } from '../dtos/point.dto';
import { PointItemService } from './point-item.service';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point) private pointRepository: Repository<Point>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private pointDataConverter: PointDataConverter,
    private pointItemDataConverter: PointItemDataConverter,
    private userService: UserService,
    private pointItemService: PointItemService,
    private itemService: ItemService,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  public async getAll(): Promise<Point[]> {
    return this.pointRepository.find({
      relations: ['_user', '_changedBy', '_collectPoint'],
    });
  }

  public async createPoint(pointDto: CreatePointDto, identifier: string) {
    const user: User = await this.userService.findOne(identifier);
    // TODO: handle exceptions
    const point: Point = this.pointDataConverter.toEntity(pointDto);
    const items: Item[] = await this.itemService.getItemsFromIds(
      pointDto.items,
    );

    point.user = user;

    point.pointItems = await this.pointItemService.getPointItems(
      items,
      user,
      point,
    );

    if (user.getCompany()) {
      const deliveryPoint: DeliveryPoint = new DeliveryPoint();
      deliveryPoint.description = pointDto.description;
      point.deliveryPoint = deliveryPoint;
    }

    if (user.getPersonal() && pointDto.description) {
      return this.errorHandlerService.InappropriateUser();
    }

    const new_point = await this.pointRepository.save(point);

    return this.pointDataConverter.toDto(new_point);
  }

  public async getOne(identifier: string): Promise<PointDto | any> {
    try {
      const point = await this.pointRepository
        .createQueryBuilder('point')
        .leftJoinAndSelect('point._pointItems', '_pointItems')
        .leftJoinAndSelect('_pointItems._item', '_item')
        .leftJoinAndSelect('point._deliveryPoint', '_deliveryPoint')
        .leftJoinAndSelect('point._user', '_user')
        .leftJoinAndSelect('_user.company', 'company')
        .leftJoinAndSelect('point._changedBy', '_changedBy')
        .where('point.identifier = :identifier', { identifier: identifier })
        .getOneOrFail();

      return this.pointDataConverter.toDto(point);
    } catch (error) {
      return error;
    }
  }

  public async updatePoint(
    pointIdentifier: string,
    pointDto: CreatePointDto,
    userIdentifier: string,
  ) {
    try {
      const user: User = await this.userService.findOne(userIdentifier);
      // TODO: handle exceptions
      // const point: Point = this.pointDataConverter.toEntity(pointDto);

      const updated_point = await this.pointRepository
        .createQueryBuilder('point')
        .leftJoinAndSelect('point._pointItems', '_pointItems')
        .leftJoinAndSelect('_pointItems._item', '_item')
        .leftJoinAndSelect('point._deliveryPoint', '_deliveryPoint')
        .leftJoinAndSelect('point._user', '_user')
        .leftJoinAndSelect('_user.company', 'company')
        .leftJoinAndSelect('point._changedBy', '_changedBy')
        // .update(Point)
        // .set({
        //   latitude: pointDto.latitude,
        //   longitude: pointDto.longitude,
        //   pointItems: pointItems,
        //   deliveryPoint: { description: pointDto.description },
        // })
        .where('point.identifier = :identifier', {
          identifier: pointIdentifier,
        })
        .getOneOrFail();

      this.pointItemService.deletePointItems(updated_point.pointItems);

      if (pointDto.items) {
        const items: Item[] = await this.itemService.getItemsFromIds(
          pointDto.items,
        );
        updated_point.pointItems = await this.pointItemService.getPointItems(
          items,
          user,
          updated_point,
        );
      }

      updated_point.changedBy = user;

      if (user.getCompany()) {
        const deliveryPoint: DeliveryPoint = new DeliveryPoint();
        deliveryPoint.description = pointDto.description;
        updated_point.deliveryPoint = deliveryPoint;
      }

      const new_point = await this.pointRepository.save(updated_point);

      return this.pointDataConverter.toDto(new_point);
      // return updated_point;
    } catch (error) {
      return error;
    }
  }
}
