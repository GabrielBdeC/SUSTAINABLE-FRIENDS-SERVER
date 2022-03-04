import { Base } from 'src/app/shared/models/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Point',
})
export class Point extends Base {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  protected _id: number;
  get id(): number {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

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
}
