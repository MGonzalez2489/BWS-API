import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { StoreService } from '../services';
import { StoreDto } from '../dto';

@Controller('store')
@ApiTags('Store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  create(@Body() createStoreDto: StoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: StoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }
}
