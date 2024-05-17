import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities';
import { StoreDto } from '../dto';
import { BaseService } from '../../common/services';

@Injectable()
export class StoreService extends BaseService<Store> {
  constructor(
    @InjectRepository(Store) private readonly repository: Repository<Store>,
  ) {
    super(repository, 'StoreService');
  }
  async create(createStoreDto: StoreDto) {
    try {
      const store = this.repository.create(createStoreDto);
      await this.repository.save(store);
      return store;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: StoreDto) {
    return `This action updates a #${id} store`;
  }
}
