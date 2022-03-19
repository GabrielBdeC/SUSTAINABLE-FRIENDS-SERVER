import { Base } from 'src/app/shared/models/base.entity';
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

  // changed by relation
  @ManyToOne(() => User, (changedBy) => changedBy.point)
  @JoinColumn({ name: 'changed_by' })
  public _changedBy: User;
  get changedBy(): User {
    return this._changedBy;
  }
  set changedBy(changedBy: User) {
    this._changedBy = changedBy;
  }

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
