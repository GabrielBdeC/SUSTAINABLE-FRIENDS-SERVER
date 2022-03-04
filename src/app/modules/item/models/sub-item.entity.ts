import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity({
  name: 'Sub_Item',
})
export class SubItem {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  protected _id: number;
  get id(): number {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  @Column({
    name: 'name',
    type: 'varchar',
    length: 84,
    nullable: false,
  })
  protected _name: string;
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  @ManyToOne(() => Item, (item) => item.subItems)
  @JoinColumn({ name: 'item_id' })
  public _item: Item;
}
