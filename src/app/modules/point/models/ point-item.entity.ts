import { Base } from 'src/app/shared/models/base.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../../item/models/item.entity';
import { User } from '../../user/models/user.entity';
import { Point } from './point.entity';

@Entity({
  name: 'Point_Item',
})
export class PointItem extends Base {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  protected _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }

  @DeleteDateColumn({
    name: 'collected_time',
    type: 'timestamp',
    nullable: true,
  })
  protected _collectedTime: Date;
  public get collectedTime(): Date {
    return this._collectedTime;
  }
  public set collectedTime(collectedTime: Date) {
    this._collectedTime = collectedTime;
  }

  @ManyToOne(() => Point, (point) => point.pointItems)
  @JoinColumn({ name: 'point_id' })
  public _point: Point;
  get point(): Point {
    return this._point;
  }
  set point(point: Point) {
    this._point = point;
  }

  @OneToOne(() => Item, (item) => item.items, {
    cascade: true,
  })
  @JoinColumn({ name: 'item_id' })
  public _item: Item;
  get item(): Item {
    return this._item;
  }
  set item(item: Item) {
    this._item = item;
  }

  @OneToOne(() => User, (user) => user.pointItemCollectedBy)
  @JoinColumn({ name: 'collected_by' })
  public _collectedBy: User;
  get collectedBy(): User {
    return this._collectedBy;
  }
  set collectedBy(collectedBy: User) {
    this._collectedBy = collectedBy;
  }
}
