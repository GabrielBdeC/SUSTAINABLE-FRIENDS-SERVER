import { Point } from './point.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'Delivery_Point_Spec',
})
export class DeliveryPoint {
  @PrimaryColumn({ name: `point_id` })
  public id: number;

  @OneToOne(() => Point, (point) => point._deliveryPoint)
  @JoinColumn({ name: `point_id` })
  public point: Point;
}