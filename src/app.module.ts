import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './_config';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { JwtAuthGuard } from './auth/guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.db_host,
      port: envs.db_port,
      database: envs.db_name,
      username: envs.db_user,
      password: envs.db_pass,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    CommonModule,
    StoreModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
