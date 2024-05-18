import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoreServiceService } from '../services/store-service.service';
import { StoreServiceDto } from '../dto';

@Controller('storeservice')
@ApiTags('StoreService')
export class StoreServiceController {
  constructor(private readonly storeService: StoreServiceService) {}

  @Post(':storeId')
  create(
    @Param('storeId', ParseUUIDPipe) storeId: string,
    @Body() storeServ: StoreServiceDto,
  ) {
    return this.storeService.create(storeId, storeServ);
  }

  @Patch(':serviceId')
  update(
    @Param('serviceId', ParseUUIDPipe) serviceId: string,
    @Body() storeServ: StoreServiceDto,
  ) {
    return this.storeService.update(serviceId, storeServ);
  }

  @Get(':storeId')
  findAll(@Param(':storeId', ParseUUIDPipe) storeId: string) {
    return this.storeService.findByStore(storeId);
  }

  @Get(':serviceId')
  findOne(@Param(':serviceId', ParseUUIDPipe) serviceId: string) {
    return this.storeService.findOne(serviceId);
  }
}
