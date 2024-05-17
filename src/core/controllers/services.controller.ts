import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServiceService } from '../services';
import { PaginationDTO } from '../../common/dtos';
import { Service } from '../entities';

@Controller('service')
@ApiTags('Service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Get(':categoryId')
  findByCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Service[]> {
    return this.serviceService.findByCategory(categoryId);
  }
  @Get()
  findAll(@Query() pagination: PaginationDTO) {
    return this.serviceService.findAll(pagination);
  }
}
