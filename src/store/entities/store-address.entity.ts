import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class StoreAddress extends BaseEntity {
  @Column()
  address: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Exclude()
  @ManyToOne(() => StoreAddress, (address) => address.store)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @Column()
  storeId: number;
}
