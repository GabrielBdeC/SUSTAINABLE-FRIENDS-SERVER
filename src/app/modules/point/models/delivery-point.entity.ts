import { Point } from './point.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'Delivery_Point_Spec',
})
export class DeliveryPoint {
  @PrimaryColumn({ name: `point_id` })
  public id: number;

  @OneToOne(() => Point, (point) => point._deliveryPoint)
  @JoinColumn({ name: `point_id` })
  public point: Point;

  @Column({
    name: 'description',
    type: 'text',
  })
  protected _description: string;
  public get description(): string {
    return this._description;
  }
  public set description(description: string) {
    this._description = description;
  }
}
