import { Length } from 'class-validator';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'Company_User_Spec',
})
export class CompanyUser {
  @PrimaryGeneratedColumn({
    name: 'user_id',
    type: 'bigint',
  })
  protected _id: number;
  get id(): number {
    return this._id;
  }

  @OneToOne(() => User)
  @Length(14)
  @Column({
    name: 'national_identity',
    type: 'varchar',
    length: '14',
    unique: true,
    nullable: false,
    comment: 'cnpj',
  })
  private cnpj: string;

  get CNPJ(): string {
    return this.cnpj;
  }

  public setCNPJ(cnpj: string): void {
    this.cnpj = cnpj;
  }
}
