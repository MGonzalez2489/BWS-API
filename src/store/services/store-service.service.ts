import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services';
import { StoreService } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StoreService as storeS } from './store.service';
import { StoreServiceDto } from '../dto';
import { ServiceService } from 'src/core/services';

@Injectable()
export class StoreServiceService extends BaseService<StoreService> {
  constructor(
    @InjectRepository(StoreService)
    private readonly repository: Repository<StoreService>,
    private readonly storeService: storeS,
    private readonly serviceServices: ServiceService,
  ) {
    super(repository, 'StoreServiceService');
  }

  async create(storeId: string, dto: StoreServiceDto) {
    try {
      const store = await this.storeService.findOne(storeId);
      const service = await this.serviceServices.findOne(dto.serviceId);
      const newService = {
        price: dto.price,
        time: dto.time,
      };
      const newEntity = this.repository.create(newService);
      newEntity.storeId = store.id;
      newEntity.service = service;
      await this.repository.save(newEntity);
      return newService;
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async update(serviceId: string, dto: StoreServiceDto) {
    try {
      const service = await this.findOne(serviceId);
      // service = await this.repository.preload(dto);
      // return await this.repository.save(service);
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
