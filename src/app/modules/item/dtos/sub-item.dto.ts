import { ItemDto } from './item.dto';

export interface SubItemDto {
  id: number;
  name: string;
  item: ItemDto;
}
