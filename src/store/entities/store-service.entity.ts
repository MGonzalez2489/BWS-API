import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities';
import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class StoreService extends BaseEntity {
  @Column()
  price: number;

  @Column()
  time: number;

  @Exclude()
  @ManyToMany(() => Store, (store) => store.services)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @Exclude()
  @Column()
  storeId: number;
}
