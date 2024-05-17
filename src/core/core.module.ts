import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Service } from './entities';
import { CategoryController } from './controllers';
import { CategoryService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Service])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CoreModule {}
