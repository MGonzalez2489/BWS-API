import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/services';
import { StoreAddress } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreService } from './store.service';
import { StoreAddressDto } from '../dto';

@Injectable()
export class StoreAddressService extends BaseService<StoreAddress> {
  constructor(
    @InjectRepository(StoreAddress)
    private readonly repository: Repository<StoreAddress>,
    private readonly storeService: StoreService,
  ) {
    super(repository, 'StoreAddressService');
  }
  async create(storeId: string, addressDto: StoreAddressDto) {
    try {
      const store = await this.storeService.findOne(storeId);

      const address = this.repository.create(addressDto);
      address.store = store;
      await this.repository.save(address);
      return address;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findBystore(storeId: string) {
    try {
      const store = await this.storeService.findOne(storeId);
      const where = { storeId: store.id };
      return await this.searchPaginated({}, where);
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
