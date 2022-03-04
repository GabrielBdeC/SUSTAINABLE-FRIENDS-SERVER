import { ItemDto } from '../dtos/item.dto';
import { Item } from '../models/item.entity';
import { SubItem } from '../models/sub-item.entity';
import { SubItemDataConverter } from './sub-item.data-converter';

export class ItemDataConverter {
  public toDto(entity: Item): ItemDto {
    const dto = {} as ItemDto;
    const subItemDataConverter: SubItemDataConverter =
      new SubItemDataConverter();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.subItems = entity.subItems.map((subItem: SubItem) => {
      return subItemDataConverter.toDto(subItem);
    });
    return dto;
  }
}
