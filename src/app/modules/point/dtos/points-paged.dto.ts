import { PointDto } from './point.dto';

export interface PagedDto {
  totalPoints?: number;
  pageSize: number;
  pageIndex: number;
  points?: PointDto[];
}
