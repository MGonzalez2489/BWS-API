import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoreService } from '../services';
import { StoreDto } from '../dto';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/users/entities';

@Controller('store')
@ApiTags('Store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  create(@Body() createStoreDto: StoreDto, @GetUser() user: User) {
    return this.storeService.create(user, createStoreDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: StoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }
}
