import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail, IsNotEmpty, IsString, Min, Max } from 'class-validator';

@Entity({
  name: 'User',
})
export class User {
  @Column({
    name: 'email',
    type: 'varchar',
    length: 84,
    unique: true,
    nullable: false,
    comment: 'used as login',
  })
  @IsEmail()
  @IsNotEmpty({
    message: 'Email field cannot be empty. Please provide an email.',
  })
  @Min(6, { message: 'Email needs to be at least 7 characters long.' })
  protected email: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 84,
    nullable: false,
  })
  protected name: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 128,
    nullable: false,
    comment: 'SHA512',
  })
  protected password: string;

  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  protected id: number;

  @Column({
    name: 'identifier',
    type: 'varchar',
    length: 36,
    nullable: false,
    comment: 'used in DTO',
  })
  @Generated('uuid')
  protected identifier: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    nullable: false,
  })
  protected createTime: Date;

  @UpdateDateColumn({
    name: 'changed_time',
    type: 'timestamp',
    nullable: true,
  })
  protected changedTime: Date;

  @DeleteDateColumn({
    name: 'deleted_time',
    type: 'timestamp',
    nullable: true,
  })
  protected deletedTime: Date;

  // get and set functions

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public getId(): number {
    return this.id;
  }

  public setId(value: number) {
    this.id = value;
  }

  public getIdentifier(): string {
    return this.identifier;
  }

  public setIdentifier(value: string) {
    this.identifier = value;
  }

  public getCreateTime(): Date {
    return this.createTime;
  }

  public setCreateTime(createTime: Date): void {
    this.createTime = createTime;
  }

  public getChangedTime(): Date {
    return this.changedTime;
  }

  public setChangedTime(changedTime: Date): void {
    this.changedTime = changedTime;
  }

  public getDeletedTime(): Date {
    return this.deletedTime;
  }

  public setDeletedTime(deletedTime: Date): void {
    this.deletedTime = deletedTime;
  }
}
