import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/_config';
import { jwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
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
  exports: [jwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
