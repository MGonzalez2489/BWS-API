import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { StoreService } from '../../store/entities';

@Entity()
export class Service extends BaseEntity {
  @Column()
  name: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  icon: string;

  //relationship
  //
  @ManyToOne(() => Category, (category) => category.services)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Exclude()
  @Column()
  categoryId: number;

  @OneToMany(() => StoreService, (service) => service.service)
  @JoinColumn()
  storeServices: StoreService[];
}
