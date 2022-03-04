import { SubItemDto } from '../dtos/sub-item.dto';
import { SubItem } from '../models/sub-item.entity';

export class SubItemDataConverter {
  public toDto(entity: SubItem): SubItemDto {
    const dto = {} as SubItemDto;
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
  }
}
