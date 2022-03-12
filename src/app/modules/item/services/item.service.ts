import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../models/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  public async getAll(): Promise<Item[]> {
    return this.itemRepository.find({
      cache: true,
    });
  }

  public async getItemsFromIds(items): Promise<Item[]> {
    const _items = await this.itemRepository
      .createQueryBuilder('item')
      // .innerJoinAndSelect('item.point_id', 'point')
      .where('item.id IN (:...items)', { items: items })
      .getMany();

    return _items;
  }
}
