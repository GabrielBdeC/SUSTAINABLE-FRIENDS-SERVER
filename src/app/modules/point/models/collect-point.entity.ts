import { Point } from './point.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'Collect_Point_Spec',
})
export class CollectPoint {
  @PrimaryColumn({ name: `point_id` })
  public id: number;

  @OneToOne(() => Point, (point) => point._collectPoint)
  @JoinColumn({ name: `point_id` })
  public point: Point;
}
