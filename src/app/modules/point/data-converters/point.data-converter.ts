import { CreatePointDto } from '../dtos/create-point.dto';
import { Point } from '../models/point.entity';
import { v4 as uuidv4 } from 'uuid';
import { DeliveryPoint } from '../models/delivery-point.entity';
import { PointDto } from '../dtos/point.dto';
import { UserDataConverter } from '../../user/data-converters/user.data-converter';
import { PointItemDataConverter } from './point-item.data-converter';
import { Item } from '../../item/models/item.entity';
import { PointItem } from '../models/ point-item.entity';
import { PointItemDto } from '../dtos/point-item.dto';

export class PointDataConverter {
  public toEntity(dto: CreatePointDto): Point {
    const point = new Point();
    point.latitude = dto.latitude;
    point.longitude = dto.longitude;

    const identifier = uuidv4().replace(/-/g, '').toUpperCase();
    point.identifier = identifier;

    return point;
  }

  public toDto(entity: Point): PointDto {
    const dto = {} as PointDto;
    const userDataConverter: UserDataConverter = new UserDataConverter();
    dto.latitude = entity.latitude;
    dto.longitude = entity.longitude;
    dto.identifier = entity.identifier;
    dto.createdBy = userDataConverter.toDtoWithoutPreferences(entity.user);
    if (dto.changedBy) {
      dto.changedBy = userDataConverter.toDtoWithoutPreferences(
        entity.changedBy,
      );
    }
    const pointItemDataConverter = new PointItemDataConverter();
    const pointItems: PointItemDto[] = [];
    for (const item of entity.pointItems) {
      const pointItemDto = pointItemDataConverter.toDto(item);
      pointItems.push(pointItemDto);
    }
    dto.pointItems = pointItems;
    return dto;
  }
}
