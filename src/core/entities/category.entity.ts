import { BaseEntity } from '../../common/entities';
import { Column, Entity, OneToMany } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  icon: string;
  @OneToMany(() => Service, (service) => service.category)
  services: Service[];
}
