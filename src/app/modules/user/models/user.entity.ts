import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Base } from 'src/app/shared/models/base.entity';
import { PersonalUser } from './personal-user.entity';
import { CompanyUser } from './company-user.entity';
import { IPreferences } from '../constants/preferences.constant';
import { Point } from '../../point/models/point.entity';

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

  @Column({
    name: 'preferences',
    type: 'json',
    nullable: false,
  })
  protected _preferences: IPreferences;

  get preferences(): IPreferences {
    return this._preferences;
  }

  set preferences(preferences: IPreferences) {
    this._preferences = preferences;
  }

  @OneToOne(() => CompanyUser, (company) => company.user, {
    nullable: true,
    cascade: true,
  })
  public company: CompanyUser;
  public getCompany(): CompanyUser {
    return this.company;
  }

  public setCompany(company: CompanyUser): void {
    this.company = company;
  }

  @OneToOne(() => PersonalUser, (personal) => personal.user, {
    nullable: true,
    cascade: true,
  })
  public personal: PersonalUser;
  public getPersonal(): PersonalUser {
    return this.personal;
  }

  public setPersonal(personal: PersonalUser): void {
    this.personal = personal;
  }

  @OneToMany(() => Point, (point) => point._user, {
    cascade: true,
    nullable: true,
  })
  public _point: Point[];
  get point(): Point[] {
    return this._point;
  }
  set point(point: Point[]) {
    this._point = point;
  }

  @OneToMany(() => Point, (pointChangedBy) => pointChangedBy._changedBy, {
    cascade: true,
    nullable: true,
  })
  public _pointChangedBy: Point[];
  get pointChangedBy(): Point[] {
    return this._pointChangedBy;
  }
  set pointChangedBy(pointChangedBy: Point[]) {
    this._pointChangedBy = pointChangedBy;
  }

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
}
