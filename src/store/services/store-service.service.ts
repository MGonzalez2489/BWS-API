import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services';
import { StoreService } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StoreService as storeS } from './store.service';
import { StoreServiceDto } from '../dto';

@Injectable()
export class StoreServiceService extends BaseService<StoreService> {
  constructor(
    @InjectRepository(StoreService)
    private readonly repository: Repository<StoreService>,
    private readonly storeService: storeS,
  ) {
    super(repository, 'StoreServiceService');
  }

  async create(storeId: string, dto: StoreServiceDto) {
    try {
      const store = await this.storeService.findOne(storeId);
      const newService = this.repository.create(dto);
      newService.store = store;

      await this.repository.save(newService);
      return newService;
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async update(serviceId: string, dto: StoreServiceDto) {
    try {
      let service = await this.findOne(serviceId);
      service = await this.repository.preload(dto);
      return await this.repository.save(service);
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async findOne(serviceId: string) {
    try {
      return await this.repository.findOneBy({ publicId: serviceId });
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async findByStore(storeId: string) {
    try {
      const store = await this.storeService.findOne(storeId);

      const where = {
        storeId: store.id,
      };

      return await this.searchPaginated({}, where);
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
