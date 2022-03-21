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
import { PointItemDataConverter } from '../data-converters/point-item.data-converter';
import { Item } from '../../item/models/item.entity';
import { ErrorHandlerService } from 'src/app/shared/errors/error.service';
import { PointDto } from '../dtos/point.dto';
import { PointItemService } from './point-item.service';
import { PointItem } from '../models/ point-item.entity';
import { PagedDto } from '../dtos/points-paged.dto';

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

  public async getAllByLatLong(lat: number, lng: number, body) {
    const rawData = await this.pointRepository.query(`SELECT *, (6371 *
      acos(
          cos(radians(${lat})) *
          cos(radians(latitude)) *
          cos(radians(${lng}) - radians(longitude)) +
          sin(radians(${lat})) *
          sin(radians(latitude))
      )) AS distance
      FROM Point WHERE deleted_time IS NULL HAVING distance <= 12.5 LIMIT ${body.pageSize} OFFSET ${body.pageIndex}
      `);

    // -23.550829 	-46.558265
    // angeloni: -28.94046868845339, -49.47507767838186

    //     SELECT *, (6371 *
    //       acos(
    //           cos(radians(-23.550829)) *
    //           cos(radians(latitude)) *
    //           cos(radians(-46.558265) - radians(longitude)) +
    //           sin(radians(-23.850829)) *
    //           sin(radians(latitude))
    //       )) AS distance
    // FROM Point HAVING distance <= 5

    // const response: PagedDto = {} as PagedDto;
    // response.totalPoints = rawData.length;

    // const pointDtos = [];
    // for (const point of rawData) {
    //   pointDtos.push(this.pointDataConverter.toDto(point));
    // }

    return rawData;
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

      return point;
      // return this.pointDataConverter.toDto(point);
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

      const updated_point = await this.getOne(pointIdentifier);

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

  public async deletePoint(pointId: string, userIdentifier: string) {
    try {
      const point: Point = await this.getOne(pointId);

      const user: User = await this.userService.findOne(userIdentifier);

      point.changedBy = user;
      point.deletedBy = user;
      await this.pointRepository.save(point);

      for (const pointItem of point.pointItems) {
        await this.pointItemService.softDeletePointItem(
          pointItem.identifier,
          userIdentifier,
        );
      }

      await this.pointRepository.softDelete(point.id);

      return 'point deleted';
    } catch (error) {
      return error;
    }
  }

  public async deletePointItem(
    pointItemIdentifier: string,
    userIdentifier: string,
  ) {
    return this.pointItemService.softDeletePointItem(
      pointItemIdentifier,
      userIdentifier,
    );
  }
}
