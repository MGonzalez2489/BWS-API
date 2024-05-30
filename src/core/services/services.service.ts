import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/services';
import { Service } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDTO } from 'src/common/dtos';
import { CategoryService } from './category.service';

@Injectable()
export class ServiceService extends BaseService<Service> {
  constructor(
    @InjectRepository(Service) private readonly repository: Repository<Service>,
    private readonly catService: CategoryService,
  ) {
    super(repository, 'ServiceService');
  }

  async findAll(pagination: PaginationDTO) {
    try {
      return await this.searchPaginated(pagination);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findByCategory(categoryId: string) {
    try {
      const category = await this.catService.findById(categoryId);
      return await this.repository.findBy({ categoryId: category.id });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(publicId: string) {
    try {
      const service = await this.repository.findOneBy({ publicId });
      if (!service)
        throw new NotFoundException(`Servicio ${publicId} no encontrado.`);

      return service;
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
