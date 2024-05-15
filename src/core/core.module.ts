import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Service } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Service])],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
