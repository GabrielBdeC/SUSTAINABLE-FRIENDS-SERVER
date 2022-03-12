import { BaseDto } from 'src/app/shared/dtos/base.dto';
import { ItemDto } from '../../item/dtos/item.dto';
import { UserDto } from '../../user/dtos/user.dto';

export interface PointItemDto extends BaseDto {
  item: ItemDto;
  collectedBy: UserDto;
}
