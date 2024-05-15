import { BaseEntity } from 'src/common/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class Store extends BaseEntity {
  @Column()
  name: string;
}
