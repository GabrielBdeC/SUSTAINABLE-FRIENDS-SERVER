import { IsNotEmpty, IsString, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  protected _id: number;
  get id(): number {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  @Column({
    name: 'identifier',
    type: 'varchar',
    length: 32,
    nullable: false,
    comment: 'used in DTO',
  })
  @IsNotEmpty()
  @IsString()
  @Length(32)
  protected _identifier: string;
  get identifier(): string {
    return this._identifier;
  }
  set identifier(identifier: string) {
    this._identifier = identifier;
  }

  @CreateDateColumn({
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

  @UpdateDateColumn({
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

  @DeleteDateColumn({
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
