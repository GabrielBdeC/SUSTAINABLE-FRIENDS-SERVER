import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Point',
})
export class Point {
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

  @Column({
    name: 'identifier',
    type: 'varchar',
    length: 32,
    nullable: false,
    unique: true,
  })
  @Generated('uuid')
  protected _identifier: string;
  get identifier(): string {
    return this._identifier;
  }
  set identifier(identifier: string) {
    this._identifier = identifier;
  }

  @Column({
    name: 'create_time',
    type: 'timestamp',
    nullable: false,
  })
  protected _createTime: Date;
  get createTime(): Date {
    return this._createTime;
  }
  set createTime(createTime: Date) {
    this._createTime = createTime;
  }

  @Column({
    name: 'changed_time',
    type: 'timestamp',
    nullable: true,
  })
  protected _changedTime: Date;
  get changedTime(): Date {
    return this._changedTime;
  }
  set changedTime(changedTime: Date) {
    this._changedTime = changedTime;
  }

  @Column({
    name: 'deleted_time',
    type: 'timestamp',
    nullable: true,
  })
  protected _deletedTime: Date;
  get deletedTime(): Date {
    return this._deletedTime;
  }
  set deletedTime(deletedTime: Date) {
    this._deletedTime = deletedTime;
  }
}
