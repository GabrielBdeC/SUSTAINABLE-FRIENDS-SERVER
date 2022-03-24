import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/auth/guards/jwt-auth.guard';
import { PointDataConverter } from '../data-converters/point.data-converter';
import { CreatePointDto } from '../dtos/create-point.dto';
import { PagedDto } from '../dtos/points-paged.dto';
import { CoordinatesValidationPipe } from '../pipes/coordinates.pipe';
import { CreatePointValidationPipe } from '../pipes/create-point-validation.pipe';
import { VerifyIdentifierPipe } from '../pipes/identifier-verification.pipe';
import { PagedBodyValidationPipe } from '../pipes/paged-dto.validation.pipe';
import { PointService } from '../services/point.service';

@Controller('point')
export class PointController {
  constructor(
    private pointService: PointService,
    private pointDataConverter: PointDataConverter,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('getByLatLong')
  public async getAllByLatLong(
    @Query('lat', new CoordinatesValidationPipe()) latitude: number,
    @Query('long', new CoordinatesValidationPipe()) longitude: number,
    @Body(new PagedBodyValidationPipe()) body: PagedDto,
  ) {
    return this.pointService.getAllByLatLong(latitude, longitude, body);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createPoint(
    @Body(new CreatePointValidationPipe()) body: CreatePointDto,
    @Request() req,
  ): Promise<any> {
    // route tested
    return this.pointService.createPoint(body, req.user.identifier);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async getOnePoint(
    @Param('id', new VerifyIdentifierPipe()) pointId: string,
  ) {
    // route tested
    const point = await this.pointService.getOne(pointId);
    return this.pointDataConverter.toDto(point);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  public async updatePoint(
    // route tested
    @Param('id', new VerifyIdentifierPipe()) pointId: string,
    @Body(new CreatePointValidationPipe()) body: CreatePointDto,
    @Request() req,
  ) {
    return this.pointService.updatePoint(pointId, body, req.user.identifier);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:pointId')
  public async deletePoint(
    // route tested
    @Param('pointId', new VerifyIdentifierPipe()) pointIdentifier: string,
    @Request() req,
  ) {
    return this.pointService.deletePoint(pointIdentifier, req.user.identifier);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:pointId/pointItem/:pointItemId')
  public async deletePointItem(
    // route tested
    @Param('pointId', new VerifyIdentifierPipe()) pointIdentifier: string,
    @Param('pointItemId', new VerifyIdentifierPipe())
    pointItemIdentifier: string,
    @Request() req,
  ) {
    return this.pointService.deletePointItem(
      pointIdentifier,
      pointItemIdentifier,
      req.user.identifier,
    );
  }
}
