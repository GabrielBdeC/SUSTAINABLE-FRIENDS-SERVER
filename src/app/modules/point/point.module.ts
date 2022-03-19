import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointController } from './controllers/point.controller';
import { PointDataConverter } from './data-converters/point.data-converter';
import { Point } from './models/point.entity';
import { CollectPoint } from './models/collect-point.entity';
import { PointService } from './services/point.service';
import { UserService } from '../user/services/user.service';
import { UsersModule } from '../user/user.module';
import { User } from '../user/models/user.entity';
import { ItemModule } from '../item/item.module';
import { PointItem } from './models/ point-item.entity';
import { Item } from '../item/models/item.entity';
import { PointItemDataConverter } from './data-converters/point-item.data-converter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Point, CollectPoint, User, PointItem, Item]),
    UsersModule,
    ItemModule,
  ],
  controllers: [PointController],
  providers: [PointService, PointDataConverter, PointItemDataConverter],
})
export class PointModule {}
