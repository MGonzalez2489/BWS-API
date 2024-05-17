import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

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

  // @OneToMany(() => CompanyService, (service) => service.service)
  // companyServices: CompanyService[];
}
