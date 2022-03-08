import { BaseDto } from '../../../shared/dtos/base.dto';
import { UserDto } from '../../user/dtos/user.dto';

export interface PointDto extends BaseDto {
  latitude: number;
  longitude: number;
  createTime: string;
  user: UserDto;
  changedBy: UserDto;
}
