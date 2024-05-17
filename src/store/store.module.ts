import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store, StoreAddress, StoreService } from './entities';
import { StoreController } from './controllers';
import { StoreService as sService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Store, StoreAddress, StoreService])],
  controllers: [StoreController],
  providers: [sService],
})
export class StoreModule { }
