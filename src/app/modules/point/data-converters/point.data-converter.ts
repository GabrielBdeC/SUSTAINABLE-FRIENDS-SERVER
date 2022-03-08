import { UserDataConverter } from '../../user/data-converters/user.data-converter';
import { PointDto } from '../dtos/point.dto';
import { Point } from '../models/point.entity';

export class PointDataConverter {
  public toEntity(dto: PointDto): Point {
    const entity = new Point();
    entity.latitude = dto.latitude;
    entity.longitude = dto.longitude;
    entity.identifier = dto.identifier;
    entity.createTime = new Date(dto.createTime);
    return entity;
  }

  public toDto(entity: Point): PointDto {
    const dto = {} as PointDto;
    const userDataConverter: UserDataConverter = new UserDataConverter();
    dto.latitude = entity.latitude;
    dto.longitude = entity.longitude;
    dto.identifier = entity.identifier;
    dto.createTime = entity.createTime.toISOString();
    dto.user = userDataConverter.toDto(entity.user);
    dto.changedBy = userDataConverter.toDto(entity.changedBy);
    return dto;
  }
}
