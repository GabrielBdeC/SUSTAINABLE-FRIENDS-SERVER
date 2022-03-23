import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Base } from '../../../shared/models/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../../user/models/user.entity';
import { PointItem } from './ point-item.entity';
import { DeliveryPoint } from './delivery-point.entity';

@Entity({
  name: 'Point',
})
export class Point extends Base {
  @IsNotEmpty({ message: 'Latitude column must not be empty.' })
  @IsLatitude({ message: 'Latitude value must be a number between -90 and 90' })
  @Column({
    name: 'latitude',
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  protected _latitude: number;
  get latitude(): number {
    return this._latitude;
  }
  set latitude(latitude: number) {
    this._latitude = latitude;
  }

  @IsNotEmpty({ message: 'Longitude column must not be empty.' })
  @IsLongitude({
    message: 'Longitude column must be a number between -180 and 180.',
  })
  @Column({
    name: 'longitude',
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  protected _longitude: number;
  get longitude(): number {
    return this._longitude;
  }
  set longitude(longitude: number) {
    this._longitude = longitude;
  }

  @ValidateNested()
  // user id relation
  @ManyToOne(() => User, (user) => user.point)
  @JoinColumn({ name: 'user_id' })
  public _user: User;
  get user(): User {
    return this._user;
  }
  set user(user: User) {
    this._user = user;
  }

  @ValidateNested()
  // changed by relation
  @ManyToOne(() => User, (user) => user.pointChangedBy)
  @JoinColumn({ name: 'changed_by' })
  public _changedBy: User;
  get changedBy(): User {
    return this._changedBy;
  }
  set changedBy(changedBy: User) {
    this._changedBy = changedBy;
  }

  @ValidateNested()
  @OneToOne(() => User, (user) => user.pointDeletedBy)
  @JoinColumn({ name: 'deleted_by' })
  public _deletedBy: User;
  get deletedBy(): User {
    return this._deletedBy;
  }
  set deletedBy(deletedBy: User) {
    this._deletedBy = deletedBy;
  }

  @ValidateNested()
  // delivery point
  @OneToOne(() => DeliveryPoint, (deliveryPoint) => deliveryPoint.point, {
    nullable: true,
    cascade: true,
  })
  public _deliveryPoint: DeliveryPoint;
  public get deliveryPoint(): DeliveryPoint {
    return this._deliveryPoint;
  }
  public set deliveryPoint(deliveryPoint: DeliveryPoint) {
    this._deliveryPoint = deliveryPoint;
  }

  @ValidateNested()
  // pointItem relation
  @OneToMany(() => PointItem, (pointItem) => pointItem._point, {
    cascade: true,
    nullable: true,
  })
  public _pointItems: PointItem[];
  get pointItems(): PointItem[] {
    return this._pointItems;
  }
  set pointItems(pointItems: PointItem[]) {
    this._pointItems = pointItems;
  }
}
