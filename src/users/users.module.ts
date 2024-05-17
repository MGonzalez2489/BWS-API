import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConsumerProfile } from './entities/consumer-profile.entity';
import { ArtistProfile } from './entities/artist-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ConsumerProfile, ArtistProfile])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
