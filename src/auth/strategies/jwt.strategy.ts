import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/users.service';
import { envs } from 'src/_config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      secretOrKey: envs.jwt_secret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { publicId } = payload;

    const user = await this.userService.findOne(publicId);
    if (!user) {
      throw new UnauthorizedException('Token no valido.');
    }
    if (user.deletedAt) {
      throw new UnauthorizedException('Token no valido.');
    }

    return user;
  }
}
