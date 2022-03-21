import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/shared/auth/guards/jwt-auth.guard';
import { PointDataConverter } from '../data-converters/point.data-converter';
import { CreatePointDto } from '../dtos/create-point.dto';
// import { PointDto } from '../dtos/point.dto';
import { Point } from '../models/point.entity';
import { PointService } from '../services/point.service';

@Controller('point')
export class PointController {
  constructor(
    private pointService: PointService,
    private pointDataConverter: PointDataConverter,
  ) {}

  @Get()
  public async getAll(): Promise<Point[]> {
    return this.pointService.getAll();
    /* return this.pointService.getAll().then((listPoint: Point[]) => {
      return listPoint.map((point: Point) => {
        return this.pointDataConverter.toDto(point);
      });
    }); */
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createPoint(
    @Body() body: CreatePointDto,
    @Request() req,
  ): Promise<any> {
    return this.pointService.createPoint(body, req.user.identifier);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async getOnePoint(@Param('id') pointId: string) {
    return this.pointService.getOne(pointId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  public async updatePoint(
    @Param('id') pointId: string,
    @Body() body: CreatePointDto,
    @Request() req,
  ) {
    return this.pointService.updatePoint(pointId, body, req.user.identifier);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:pointId/pointItem/:pointItemId')
  public async deletePointItem(
    @Param('pointItemId') pointItemIdentifier: string,
  ) {
    return this.pointService.deletePointItem(pointItemIdentifier);
  }
}
