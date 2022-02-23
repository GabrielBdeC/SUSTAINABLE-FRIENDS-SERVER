import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'CompanyUser',
})
export class CompanyUser {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  protected id: number;

  @Column({
    name: 'cnpj',
    type: 'varchar',
    length: '11',
    unique: true,
    nullable: false,
    comment: 'cnpj',
  })
  protected cnpj: string;

  @OneToOne(() => User, {
    cascade: true,
  })
  @JoinColumn()
  protected user: User;

  public getCNPJ(): string {
    return this.cnpj;
  }

  public setCNPJ(cnpj: string): void {
    this.cnpj = cnpj;
  }

  public getUser(): any {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }
}
