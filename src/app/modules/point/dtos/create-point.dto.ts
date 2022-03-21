import { PointItemDto } from './point-item.dto';

export interface CreatePointDto {
  latitude: number;
  longitude: number;
  items?: number[];
  description?: string;
}
