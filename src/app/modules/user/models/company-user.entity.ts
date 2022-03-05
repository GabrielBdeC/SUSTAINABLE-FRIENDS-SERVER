import { Length } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'Company_User_Spec',
})
export class CompanyUser {
  @PrimaryColumn({
    name: 'user_id',
  })
  public id: number;

  @OneToOne(() => User, (user) => user.company)
  @JoinColumn({ name: `user_id` })
  public user: User;

  @Length(14)
  @Column({
    name: 'national_identity',
    type: 'varchar',
    length: '14',
    unique: true,
    nullable: false,
    comment: 'cnpj',
  })
  protected _cnpj: string;

  get cnpj(): string {
    return this._cnpj;
  }

  public set cnpj(cnpj: string) {
    this._cnpj = cnpj;
  }
}
