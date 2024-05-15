import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { BaseService } from 'src/common/services';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService extends BaseService<Store> {
  constructor(
    @InjectRepository(Store) private readonly repository: Repository<Store>,
  ) {
    super(repository, 'StoreService');
  }
  async create(createStoreDto: CreateStoreDto) {
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

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }
}
