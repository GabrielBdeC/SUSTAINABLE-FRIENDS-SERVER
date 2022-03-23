import { Point } from './point.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({
  name: 'Delivery_Point_Spec',
})
export class DeliveryPoint {
  @OneToOne(() => Point, (point) => point._deliveryPoint, {
    primary: true,
  })
  @JoinColumn({ name: `point_id` })
  public point: Point;

  @IsNotEmpty({ message: 'Description column must not be empty.' })
  @IsString({ message: 'Description value must be a string.' })
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
