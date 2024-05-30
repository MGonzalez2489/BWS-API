import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services';
import { Category } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDTO } from '../../common/dtos';

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
      const category = await this.repository.findOneBy({ publicId: id });
      if (!category) {
        throw new NotFoundException(`Categoria ${id} no encontrada.`);
      }
      return category;
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async findAll(pagination: PaginationDTO) {
    try {
      return await this.searchPaginated(pagination);
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
