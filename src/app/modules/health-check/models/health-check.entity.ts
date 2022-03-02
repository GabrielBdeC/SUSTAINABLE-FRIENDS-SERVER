import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Health_Check',
})
export class HealthCheck {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  protected _id: number;

  get id(): number {
    return this._id;
  }
}
