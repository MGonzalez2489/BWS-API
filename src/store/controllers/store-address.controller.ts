import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoreAddressService } from '../services';
import { StoreAddressDto } from '../dto';

@Controller('storeaddress')
@ApiTags('StoreAddress')
export class StoreAddressController {
  constructor(private readonly storeAddressService: StoreAddressService) { }

  @Get(':storeId')
  findByStore(@Param(':storeId', ParseUUIDPipe) storeId: string) {
    return this.storeAddressService.findBystore(storeId);
  }

  @Post(':storeId')
  create(
    @Param('storeId', ParseUUIDPipe) storeId: string,
    @Body() storeAddress: StoreAddressDto,
  ) {
    return this.storeAddressService.create(storeId, storeAddress);
  }
}
