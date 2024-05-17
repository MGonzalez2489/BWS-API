import { BaseEntity } from '../../common/entities';
import { Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ConsumerProfile extends BaseEntity {
  @OneToOne(() => User, (user) => user.consumerProfile)
  user: User;
}
