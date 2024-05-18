import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store, StoreAddress, StoreService } from './entities';
import { StoreAddressController, StoreController } from './controllers';
import { StoreAddressService, StoreService as sService } from './services';
import { StoreServiceController } from './controllers/store-service.controller';
import { StoreServiceService } from './services/store-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, StoreAddress, StoreService])],
  controllers: [
    StoreController,
    StoreAddressController,
    StoreServiceController,
  ],
  providers: [sService, StoreAddressService, StoreServiceService],
})
export class StoreModule { }
