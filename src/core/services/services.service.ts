import { Injectable } from '@nestjs/common';
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

  async findAll(pagination: PaginationDTO): Promise<Service[]> {
    try {
      return await this.paginate(pagination);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findByCategory(categoryId: string): Promise<Service[]> {
    try {
      const category = await this.catService.findById(categoryId);
      return await this.repository.findBy({ categoryId: category.id });
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
