import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities';
import { StoreDto } from '../dto';
import { BaseService } from '../../common/services';
import { User } from '../../users/entities';

@Injectable()
export class StoreService extends BaseService<Store> {
  constructor(
    @InjectRepository(Store) private readonly repository: Repository<Store>,
  ) {
    super(repository, 'StoreService');
  }
  async create(user: User, createStoreDto: StoreDto) {
    try {
      const store = this.repository.create(createStoreDto);
      store.user = user;
      await this.repository.save(store);
      return store;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(publicId: string) {
    try {
      return await this.repository.findOneBy({ publicId });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  update(id: number, updateStoreDto: StoreDto) {
    return `This action updates a #${id} store`;
  }
}
