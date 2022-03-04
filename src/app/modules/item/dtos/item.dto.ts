import { SubItemDto } from './sub-item.dto';

export interface ItemDto {
  id: number;
  name: string;
  subItems: SubItemDto[];
}
