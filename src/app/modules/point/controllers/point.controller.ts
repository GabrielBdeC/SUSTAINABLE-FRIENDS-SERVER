import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/shared/auth/guards/jwt-auth.guard';
import { PointDataConverter } from '../data-converters/point.data-converter';
import { CreatePointDto } from '../dtos/create-point.dto';
import { Point } from '../models/point.entity';
import { PointService } from '../services/point.service';

@Controller('point')
export class PointController {
  constructor(
    private pointService: PointService,
    private pointDataConverter: PointDataConverter,
  ) {}

  // @Get()
  // public async getAll(): Promise<Point[]> {
  //   return this.pointService.getAll();
  //   /* return this.pointService.getAll().then((listPoint: Point[]) => {
  //     return listPoint.map((point: Point) => {
  //       return this.pointDataConverter.toDto(point);
  //     });
  //   }); */
  // }

  @Get()
  public async getAllByLatLong(
    @Query('lat') latitude: number,
    @Query('long') longitude: number,
    @Body() body,
  ) {
    return this.pointService.getAllByLatLong(latitude, longitude, body);
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
    const point = await this.pointService.getOne(pointId);
    return this.pointDataConverter.toDto(point);
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
  @Delete('/:pointId')
  public async deletePoint(
    @Param('pointId') pointIdentifier: string,
    @Request() req,
  ) {
    return this.pointService.deletePoint(pointIdentifier, req.user.identifier);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:pointId/pointItem/:pointItemId')
  public async deletePointItem(
    @Param('pointItemId') pointItemIdentifier: string,
    @Request() req,
  ) {
    return this.pointService.deletePointItem(
      pointItemIdentifier,
      req.user.identifier,
    );
  }
}
