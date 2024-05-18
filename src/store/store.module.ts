import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store, StoreAddress, StoreService } from './entities';
import { StoreAddressController, StoreController } from './controllers';
import { StoreAddressService, StoreService as sService } from './services';
import { StoreServiceController } from './controllers/store-service.controller';
import { StoreServiceService } from './services/store-service.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, StoreAddress, StoreService]),
    UsersModule,
  ],
  controllers: [
    StoreController,
    StoreAddressController,
    StoreServiceController,
  ],
  providers: [sService, StoreAddressService, StoreServiceService],
})
export class StoreModule { }
