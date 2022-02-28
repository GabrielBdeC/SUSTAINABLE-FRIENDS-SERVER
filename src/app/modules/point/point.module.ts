import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointController } from './controllers/point.controller';
import { PointDataConverter } from './data-converters/point.data-converter';
import { Point } from './models/point.entity';
import { PointService } from './services/point.service';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  controllers: [PointController],
  providers: [PointService, PointDataConverter],
})
export class PointModule {}
