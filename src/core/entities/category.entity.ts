import { BaseEntity } from 'src/common/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  icon: string;
}
