import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanyUser } from './company-user.entity';
import { Base } from 'src/app/shared/models/base.entity';

@Entity({
  name: 'User',
})
export class User extends Base {
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

  @OneToOne(() => CompanyUser, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  protected company: CompanyUser;

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

  public getCompany(): string {
    return this.company.getCNPJ();
  }

  public setCompany(company: CompanyUser): void {
    this.company = company;
  }
}
