import { BaseEntity } from '../../common/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class Store extends BaseEntity {
  @Column()
  name: string;
}
