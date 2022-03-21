import { Item } from '../../item/models/item.entity';
import { Point } from '../models/point.entity';
import { v4 as uuidv4 } from 'uuid';
import { PointItem } from '../models/ point-item.entity';
import { User } from '../../user/models/user.entity';
import { PointItemDto } from '../dtos/point-item.dto';

export class PointItemDataConverter {
  public toEntity(item: Item, point: Point, user: User) {
    const pointItem = new PointItem();
    pointItem.item = item;
    pointItem.point = point;
    // pointItem.collectedBy = user;
    const identifier = uuidv4().replace(/-/g, '').toUpperCase();
    pointItem.identifier = identifier;

    return pointItem;
  }

  public toDto(pointItem: PointItem) {
    const dto = {} as PointItemDto;
    dto.item = pointItem.item;
    dto.identifier = pointItem.identifier;

    return dto;
  }
}
