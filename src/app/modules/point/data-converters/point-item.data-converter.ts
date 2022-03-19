import { Item } from '../../item/models/item.entity';
import { Point } from '../models/point.entity';
import { v4 as uuidv4 } from 'uuid';
import { PointItem } from '../models/ point-item.entity';
import { User } from '../../user/models/user.entity';

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
}
