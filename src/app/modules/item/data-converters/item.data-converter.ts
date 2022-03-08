import { ItemDto } from '../dtos/item.dto';
import { Item } from '../models/item.entity';

export class ItemDataConverter {
  public toDto(entity: Item): ItemDto {
    const dto = {} as ItemDto;
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
  }
}
