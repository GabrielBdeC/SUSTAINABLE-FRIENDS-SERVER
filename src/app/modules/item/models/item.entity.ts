import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Point } from '../../point/models/point.entity';

@Entity({
  name: 'Item',
})
export class Item {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  protected _id: number;
  get id(): number {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  @Column({
    name: 'name',
    type: 'varchar',
    length: 84,
    nullable: false,
  })
  protected _name: string;
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  @ManyToOne(() => Point, (point) => point.items)
  @JoinColumn({ name: 'point_id' })
  public _point: Point;
  get point(): Point {
    return this._point;
  }
  set point(point: Point) {
    this._point = point;
  }
}
