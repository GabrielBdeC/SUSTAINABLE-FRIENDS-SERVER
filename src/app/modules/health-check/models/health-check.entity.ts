import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Health_Check',
})
export class HealthCheck {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  protected id: number;

  @Column({
    name: 'identifier',
    type: 'varchar',
    length: 32,
    nullable: false,
    unique: true,
  })
  @Generated('uuid')
  protected identifier: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    nullable: false,
  })
  protected createTime: Date;

  @Column({
    name: 'changed_time',
    type: 'timestamp',
    nullable: true,
  })
  protected changedTime: Date;

  @Column({
    name: 'deleted_time',
    type: 'timestamp',
    nullable: true,
  })
  protected deletedTime: Date;

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
