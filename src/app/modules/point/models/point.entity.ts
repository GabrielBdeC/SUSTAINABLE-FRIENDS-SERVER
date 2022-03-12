import { Base } from 'src/app/shared/models/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../../user/models/user.entity';
import { CollectPoint } from './collect-point.entity';
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

  @ManyToOne(() => User, (user) => user.point)
  @JoinColumn({ name: 'user_id' })
  public _user: User;
  get user(): User {
    return this._user;
  }
  set user(user: User) {
    this._user = user;
  }

  @ManyToOne(() => User, (changedBy) => changedBy.point)
  @JoinColumn({ name: 'changed_by' })
  public _changedBy: User;
  get changedBy(): User {
    return this._changedBy;
  }
  set changedBy(changedBy: User) {
    this._changedBy = changedBy;
  }

  @OneToOne(() => CollectPoint, (collectPoint) => collectPoint.point, {
    nullable: true,
    cascade: true,
  })
  public _collectPoint: CollectPoint;

  @OneToOne(() => DeliveryPoint, (deliveryPoint) => deliveryPoint.point, {
    nullable: true,
    cascade: true,
  })
  public _deliveryPoint: DeliveryPoint;
}
