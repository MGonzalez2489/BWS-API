import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/_config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          secret: envs.jwt_secret,
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
    UsersModule,
  ],
})
export class AuthModule {}
