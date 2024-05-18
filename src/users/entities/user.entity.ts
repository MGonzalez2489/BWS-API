import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ConsumerProfile } from './consumer-profile.entity';
import { ArtistProfile } from './artist-profile.entity';
import { Store } from '../../store/entities/store.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true })
  firstName: string;
  @Column({ nullable: true })
  lastName: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ default: false })
  isOwner: true;

  //relations
  @OneToOne(() => ConsumerProfile, (consumerProfile) => consumerProfile.user)
  @JoinColumn()
  consumerProfile: ConsumerProfile;

  @OneToOne(() => ArtistProfile, (artistProfile) => artistProfile.user)
  @JoinColumn()
  artistProfile: ArtistProfile;

  @OneToOne(() => Store, (store) => store.user)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  storeId: number;
  //cycle

  @BeforeInsert()
  formatCredentials() {
    this.email = this.email.trim().toLowerCase();
  }

  @BeforeUpdate()
  formatProperties() {
    if (this.firstName) {
      this.firstName = this.firstName.trim();
    }
    if (this.lastName) {
      this.lastName = this.lastName.trim();
    }
    if (this.phone) {
      this.phone = this.phone.replaceAll(' ', '').replaceAll('-', '');
    }
  }
}
