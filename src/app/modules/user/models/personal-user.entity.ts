import { Length } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'Personal_User_Spec',
})
export class PersonalUser {
  @PrimaryColumn({ name: `user_id` })
  public id: number;

  @OneToOne(() => User, (user) => user.personal)
  @JoinColumn({ name: `user_id` })
  public user: User;

  @Length(11)
  @Column({
    name: 'national_identity',
    type: 'varchar',
    length: '11',
    unique: true,
    nullable: false,
    comment: 'cpf',
  })
  protected _cpf: string;

  public get cpf(): string {
    return this._cpf;
  }

  public set cpf(cpf: string) {
    this._cpf = cpf;
  }
}
