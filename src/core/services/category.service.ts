import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services';
import { Category } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDTO } from 'src/common/dtos';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {
    super(repository, 'CategoryService');
  }

  async findAll(pagination: PaginationDTO) {
    try {
      return await this.paginate(pagination);
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
