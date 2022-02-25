import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanyUser } from './company-user.entity';

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
  @IsEmail({ message: 'Provide a proper email.' })
  @IsNotEmpty({
    message: 'Email field must not be empty. Please provide an email.',
  })
  @IsString()
  @Length(6, 84)
  protected email: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 84,
    nullable: false,
  })
  @IsNotEmpty({
    message: 'Name must not be empty. Provide a name.',
  })
  @MinLength(1, { message: 'Name must have at least 1 character.' })
  @MaxLength(84, { message: 'Name must have a maximum of 84 characters.' })
  @IsString()
  protected name: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 128,
    nullable: false,
    comment: 'SHA512',
  })
  @IsNotEmpty({
    message: 'Password must not be empty. Provide a password.',
  })
  @Length(8, 128)
  @IsString()
  protected password: string;

  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  protected id: number;

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

  @OneToOne(() => CompanyUser, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  protected company: CompanyUser;

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

  // public setId(value: number) {
  //   this.id = value;
  // }

  public getIdentifier(): string {
    return this.identifier;
  }

  public setIdentifier(value: string) {
    this.identifier = value;
  }

  // public getCreateTime(): Date {
  //   return this.createTime;
  // }

  // public setCreateTime(createTime: Date): void {
  //   this.createTime = createTime;
  // }

  // public getChangedTime(): Date {
  //   return this.changedTime;
  // }

  // public setChangedTime(changedTime: Date): void {
  //   this.changedTime = changedTime;
  // }

  // public getDeletedTime(): Date {
  //   return this.deletedTime;
  // }

  // public setDeletedTime(deletedTime: Date): void {
  //   this.deletedTime = deletedTime;
  // }

  public getCompany(): string {
    return this.company.getCNPJ();
  }

  public setCompany(company: CompanyUser): void {
    this.company = company;
  }
}
