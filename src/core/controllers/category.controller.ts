import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services';
import { PaginationDTO } from 'src/common/dtos';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  findAll(@Query() pagination: PaginationDTO) {
    return this.categoryService.findAll(pagination);
  }
}
