import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { BaseService } from 'src/common/services';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends BaseService<any> {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super(null, 'AuthService');
  }
  async login(dto: AuthDto) {
    console.log('dto', dto);
    const user = await this.userService.findByEmail(dto.email);
    console.log('user', user);
    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }
    const hasAccess = this.userService.isValidUserPassword(
      dto.password,
      user.password,
    );
    if (!hasAccess) {
      throw new UnauthorizedException('Acceso denegado');
    }

    return {
      token: this.getJwtPayload({ publicId: user.publicId }),
    };
  }
  async signIn(dto: AuthDto) {
    const user = await this.userService.create(dto);
    return {
      token: this.getJwtPayload({ publicId: user.publicId }),
    };
  }
  private getJwtPayload(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
