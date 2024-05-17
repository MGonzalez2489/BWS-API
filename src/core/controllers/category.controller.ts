import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services';
import { PaginationDTO } from 'src/common/dtos';
import { Category } from '../entities';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  findAll(@Query() pagination: PaginationDTO): Promise<Category[]> {
    return this.categoryService.findAll(pagination);
  }
}
