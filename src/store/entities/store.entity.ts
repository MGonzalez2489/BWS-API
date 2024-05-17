import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { User } from '../../users/entities';
import { StoreAddress } from './store-address.entity';
import { StoreService } from './store-service.entity';

@Entity()
export class Store extends BaseEntity {
  @Column()
  name: string;

  //Owner (user)
  @Exclude()
  @OneToOne(() => User, (user) => user.store)
  user: User;

  userId: number;

  //Addresses

  @OneToMany(() => StoreAddress, (address) => address.store)
  address: StoreAddress[];

  //services
  @OneToMany(() => StoreService, (service) => service.store)
  services: StoreService[];
}
