import { Controller, Get } from '@nestjs/common';
import { PointDataConverter } from '../data-converters/point.data-converter';
import { PointDto } from '../dtos/point.dto';
import { Point } from '../models/point.entity';
import { PointService } from '../services/point.service';

@Controller('point')
export class PointController {
  constructor(
    private pointService: PointService,
    private pointDataConverter: PointDataConverter,
  ) {}

  @Get()
  public async getAll(): Promise<PointDto[]> {
    return this.pointService.getAll().then((listPoint: Point[]) => {
      return listPoint.map((point: Point) => {
        return this.pointDataConverter.toDto(point);
      });
    });
  }
}
