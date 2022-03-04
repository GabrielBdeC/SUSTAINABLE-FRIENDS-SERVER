import { BaseDto } from '../../../shared/dtos/base.dto';

export interface PointDto extends BaseDto {
  latitude: number;
  longitude: number;
  createTime: string;
}
