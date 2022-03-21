import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../item/models/item.entity';
import { User } from '../../user/models/user.entity';
import { UserService } from '../../user/services/user.service';
import { PointItemDataConverter } from '../data-converters/point-item.data-converter';
import { PointItem } from '../models/ point-item.entity';
import { Point } from '../models/point.entity';

@Injectable()
export class PointItemService {
  constructor(
    private pointItemDataConverter: PointItemDataConverter,
    @InjectRepository(PointItem)
    private pointItemRepository: Repository<PointItem>,
    private userService: UserService,
  ) {}

  public async getPointItems(
    items: Item[],
    user: User,
    point: Point,
  ): Promise<PointItem[]> {
    const pointItems: PointItem[] = [];
    for (const item of items) {
      const pointItem: PointItem = this.pointItemDataConverter.toEntity(
        item,
        point,
        user,
      );
      pointItems.push(pointItem);
    }

    return pointItems;
  }

  public async deletePointItems(pointItems: PointItem[]) {
    for (const pointItem of pointItems) {
      await this.pointItemRepository.delete(pointItem.id);
    }
  }

  public async softDeletePointItem(
    pointItemIdentifier: string,
    userIdentifier: string,
  ) {
    try {
      const pointItem = await this.pointItemRepository
        .createQueryBuilder('pointItem')
        .where('pointItem.identifier = :identifier', {
          identifier: pointItemIdentifier,
        })
        .getOneOrFail();

      const user = await this.userService.findOne(userIdentifier);

      await this.pointItemRepository.softDelete(pointItem.id);
      pointItem.collectedBy = user;
      await this.pointItemRepository.save(pointItem);

      return 'pointItem deleted';
    } catch (error) {
      return error;
    }
  }
}
