import { IsInt } from 'class-validator';
import { PointDto } from './point.dto';

export class PagedDto {
  totalPoints?: number;

  @IsInt({ message: "Value 'pageSize' must be an integer number." })
  pageSize: number;

  @IsInt({ message: "Value 'pageIndex' must be an integer number." })
  pageIndex: number;

  points?: PointDto[];
}
