import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities';
import { StoreDto } from '../dto';
import { BaseService } from '../../common/services';
import { User } from '../../users/entities';
import { UsersService } from '../../users/users.service';

@Injectable()
export class StoreService extends BaseService<Store> {
  constructor(
    @InjectRepository(Store) private readonly repository: Repository<Store>,
    private readonly userService: UsersService,
  ) {
    super(repository, 'StoreService');
  }
  async create(user: User, createStoreDto: StoreDto) {
    try {
      const store = this.repository.create(createStoreDto);
      store.user = user;
      if (user.isOwner) {
        throw new BadRequestException('El usuario ya es propietario.');
      }
      this.userService.makeUserAsOwner(user.publicId);
      await this.repository.save(store);
      return store;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(publicId: string) {
    try {
      const user = await this.repository.findOneBy({ publicId });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  update(id: number, updateStoreDto: StoreDto) {
    return `This action updates a #${id} store`;
  }
}
