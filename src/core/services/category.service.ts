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

  async findById(id: string): Promise<Category> {
    try {
      return await this.repository.findOneBy({ publicId: id });
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async findAll(pagination: PaginationDTO): Promise<Category[]> {
    try {
      return await this.paginate(pagination);
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
