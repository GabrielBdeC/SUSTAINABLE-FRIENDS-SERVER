import { Length } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @Length(14)
  @Column({
    name: 'cnpj',
    type: 'varchar',
    length: '14',
    unique: true,
    nullable: false,
    comment: 'cnpj',
  })
  protected cnpj: string;

  public getCNPJ(): string {
    return this.cnpj;
  }

  public setCNPJ(cnpj: string): void {
    this.cnpj = cnpj;
  }
}
