import { Controller, Get } from '@nestjs/common';
import { ItemDataConverter } from '../data-converters/item.data-converter';
import { ItemDto } from '../dtos/item.dto';
import { Item } from '../models/item.entity';
import { ItemService } from '../services/item.service';

@Controller('api/v1/item')
export class ItemController {
  constructor(
    private itemService: ItemService,
    private itemDataConverter: ItemDataConverter,
  ) {}

  @Get()
  async getAll(): Promise<ItemDto[]> {
    return this.itemService.getAll().then((listItems: Item[]) => {
      return listItems.map((item: Item) => {
        return this.itemDataConverter.toDto(item);
      });
    });
  }
}
