import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store, StoreAddress, StoreService } from './entities';
import { StoreAddressController, StoreController } from './controllers';
import { StoreAddressService, StoreService as sService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Store, StoreAddress, StoreService])],
  controllers: [StoreController, StoreAddressController],
  providers: [sService, StoreAddressService],
})
export class StoreModule {}
