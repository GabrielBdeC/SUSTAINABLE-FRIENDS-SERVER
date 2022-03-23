import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointController } from './controllers/point.controller';
import { PointDataConverter } from './data-converters/point.data-converter';
import { Point } from './models/point.entity';
import { PointService } from './services/point.service';
import { UsersModule } from '../user/user.module';
import { User } from '../user/models/user.entity';
import { ItemModule } from '../item/item.module';
import { PointItem } from './models/ point-item.entity';
import { Item } from '../item/models/item.entity';
import { PointItemDataConverter } from './data-converters/point-item.data-converter';
import { ErrorModule } from '../../shared/errors/error.module';
import { PointItemService } from './services/point-item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Point, User, PointItem, Item]),
    UsersModule,
    ItemModule,
    ErrorModule,
  ],
  controllers: [PointController],
  providers: [
    PointService,
    PointItemService,
    PointDataConverter,
    PointItemDataConverter,
  ],
})
export class PointModule {}
