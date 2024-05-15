import { BaseEntity } from 'src/common/entities';
import { BeforeUpdate, Column, Entity } from 'typeorm';

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
