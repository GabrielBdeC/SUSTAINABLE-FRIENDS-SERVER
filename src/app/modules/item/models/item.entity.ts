import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubItem } from './sub-item.entity';

@Entity({
  name: 'Item',
})
export class Item {
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

  @OneToMany(() => SubItem, (subItem) => subItem._item)
  private _subItems: SubItem[];
  get subItems(): SubItem[] {
    return this._subItems;
  }
  set subItem(subItems: SubItem[]) {
    this._subItems = subItems;
  }
}
