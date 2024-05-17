import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Service } from './entities';
import { CategoryController } from './controllers';
import { CategoryService, ServiceService } from './services';
import { ServiceController } from './controllers/services.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Service])],
  controllers: [CategoryController, ServiceController],
  providers: [CategoryService, ServiceService],
  exports: [CategoryService, ServiceService],
})
export class CoreModule { }
