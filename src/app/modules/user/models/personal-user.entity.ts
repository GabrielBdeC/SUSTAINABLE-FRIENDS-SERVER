import { Length } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'Personal_User_Spec',
})
export class PersonalUser {
  @PrimaryGeneratedColumn({
    name: 'user_id',
    type: 'bigint',
  })
  protected id: number;

  @Length(11)
  @Column({
    name: 'national_identity',
    type: 'varchar',
    length: '11',
    unique: true,
    nullable: false,
    comment: 'cpf',
  })
  protected cpf: string;

  public getCPF(): string {
    return this.cpf;
  }

  public setCPF(cpf: string): void {
    this.cpf = cpf;
  }
}
