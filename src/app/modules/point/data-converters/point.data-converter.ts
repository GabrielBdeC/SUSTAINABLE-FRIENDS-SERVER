import { CreatePointDto } from '../dtos/create-point.dto';
import { Point } from '../models/point.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../user/models/user.entity';
import { CollectPoint } from '../models/collect-point.entity';
import { DeliveryPoint } from '../models/delivery-point.entity';
import { PointDto } from '../dtos/point.dto';
import { UserDataConverter } from '../../user/data-converters/user.data-converter';

export class PointDataConverter {
  public toEntity(dto: CreatePointDto, user: User): Point {
    const point = new Point();
    point.latitude = dto.latitude;
    point.longitude = dto.longitude;

    const identifier = uuidv4().replace(/-/g, '').toUpperCase();
    point.identifier = identifier;

    if (user.getPersonal()) {
      // const collectPoint = new CollectPoint();
      // collectPoint.point = point;
      // point._collectPoint = collectPoint;
    } else {
      const deliveryPoint = new DeliveryPoint();
      deliveryPoint.description = dto.description;
      point._deliveryPoint = deliveryPoint;
    }

    return point;
  }

  public toDto(entity: Point): PointDto {
    const dto = {} as PointDto;
    const userDataConverter: UserDataConverter = new UserDataConverter();
    dto.latitude = entity.latitude;
    dto.longitude = entity.longitude;
    dto.identifier = entity.identifier;
    dto.createdBy = userDataConverter.toDto(entity.user);
    dto.changedBy = userDataConverter.toDto(entity.changedBy);
    return dto;
  }

  public fromUserToPointDto(user: User): PointDto {
    const dto = {} as PointDto;
    const userDataConverter: UserDataConverter = new UserDataConverter();
    dto.latitude = user._point[0].latitude;
    dto.longitude = user._point[0].longitude;
    dto.identifier = user._point[0].identifier;
    dto.createdBy = userDataConverter.toDto(user);

    return dto;
  }
}
