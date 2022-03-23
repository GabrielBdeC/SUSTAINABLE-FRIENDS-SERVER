import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandlerService } from 'src/app/shared/errors/error.service';
import { Repository } from 'typeorm';
import { IPreferences } from '../../user/constants/preferences.constant';
import { Item } from '../models/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  public async getAll(): Promise<Item[]> {
    return this.itemRepository.find({
      cache: true,
    });
  }

  public async getItemsFromIds(items: number[]): Promise<Item[] | any> {
    const numberOfItems = await this.itemRepository.find({});
    try {
      const nonItems = items.filter((item) => item > numberOfItems.length);
      items = items.filter((item) => item <= numberOfItems.length);

      if (nonItems.length > 0) {
        return await this.errorHandlerService.ItemNonExistent(
          nonItems,
          numberOfItems.length,
        );
      } else if (items) {
        return await this.itemRepository
          .createQueryBuilder('item')
          // .innerJoinAndSelect('item.point_id', 'point')
          .where('item.id IN (:...items)', { items: items })
          .getMany();
      }
    } catch (error) {
      if (error instanceof TypeError) {
        return this.errorHandlerService.ItemNonExistent(
          items,
          numberOfItems.length,
        );
      }
    }
  }

  public async verifyItems(items: IPreferences): Promise<any> {
    const itemsDB_names = await this.getAll().then((items) =>
      items.map((item) => item.name),
    );
    for (const item of items.items) {
      if (itemsDB_names.includes(item.name)) continue;
      else {
        return this.errorHandlerService.ItemNameNonExistent(item.name);
      }
    }
  }
}
