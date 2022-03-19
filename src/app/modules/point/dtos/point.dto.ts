import { BaseDto } from '../../../shared/dtos/base.dto';
import { UserDto } from '../../user/dtos/user.dto';
import { PointItemDto } from './point-item.dto';

export interface PointDto extends BaseDto {
  latitude: number;
  longitude: number;
  createdBy: UserDto;
  changedBy?: UserDto;
  items?: PointItemDto[];
  // delivery?: DeliveryPoint;
}
