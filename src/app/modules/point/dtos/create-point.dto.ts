import { PointItemDto } from './point-item.dto';

export interface CreatePointDto {
  latitude: number;
  longitude: number;
  items?: PointItemDto[];
  description?: string;
}
