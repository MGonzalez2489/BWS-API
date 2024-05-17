import { BaseEntity } from '../../common/entities';
import { Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ArtistProfile extends BaseEntity {
  @OneToOne(() => User, (user) => user.artistProfile)
  user: User;
}
